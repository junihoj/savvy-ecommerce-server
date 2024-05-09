const sendToken = (user, statusCode, res)=>{
    const token = user.getJwtToken()
    const options = {
        expires: new Date(Date.now() + 90 * 24*60*60*1000),
        httpOnly:true,
    }
    const {password:userPassword, ...userData} = user;
    res.status(statusCode).cookie("token", token, options).json({
        success:true,
        userData,
        token
    })

}

module.exports = sendToken;