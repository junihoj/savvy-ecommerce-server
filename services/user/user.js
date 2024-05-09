const jwt= require("jsonwebtoken");
const userModel = require("../../model/user");
const ErrorHandler = require("../../utils/ErrorHandler");
const UserMailService = require("./user-mail-service");
const sendToken = require("../../utils/JwtToken");
class UserService{
    userModel = userModel;
    userMailService = new UserMailService();
    constructor(){
        console.log("USER SERVICE WAS CALLED")
    }
    createActivationToken (user){
        return jwt.sign(user, process.env.ACTIVATION_SECRET,{
            expiresIn:'5m'
        });
    }

    async createUser(req, res, next){
        console.log("user service class");
        const {name, email, password} = req.body;
        const userEmail = await this.userModel.findOne({email});
        if(userEmail){
            
            return next(new ErrorHandler("user already exists", 400))
    
        }
        // const filename = req.file.filename;
        // const fileUrl= path.join(filename);
    
        const user = {
            name,
            email,
            password,
            // avatar: fileUrl
        }
        const newUser = userModel.create(user);
        const activationToken = this.createActivationToken(user);
        const activationLink = `${process.env.CLIENT_URL}/activation/${activationToken}`;
        this.userMailService.sendActivationMail(email, {activationLink, name:name.split(" ")[0], })
        res.status(201).json({
            success:true,
            message:`Please check your mailbox to activate your account`
        })
        
        console.log("USER", user)
    }

    async verifyUserEmail(req, res, next){
        const {activation_token} = req.body;

        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
        if(!newUser){
            return next(new ErrorHandler("Invalid token", 400))
        }
        let user = await userModel.findOneAndUpdate({email:newUser.email},{isEmailVerified:true});
        if(!user){
            return next(new ErrorHandler("An Error Occurred while creating your account please try again"))
        }
        sendToken(user,200, res);
    }

    async loginUser(req,res,next){
        const {email, password} = req.body;
        if(!email || !password){
            return next(new ErrorHandler('Please Provide all the neccessary input'));
        }
        const user = await userModel.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("user doesn't exists", 400));
        }
        const isPasswordValid = await user.comparePassword(password);
        
        if(!isPasswordValid){
            return next(new ErrorHandler("Invalid Credentails provided"))
        }
        
        sendToken(user, 201, res);
    }

    async getUser(req,res,next){
        const user = await userModel.findById(req.user.id);
        if(!user){
            return next(new ErrorHandler("user doesn't exists", 400))
        }
        res.status(200).json({
            success:true,
            user
        })
    }
    
}

module.exports = UserService;