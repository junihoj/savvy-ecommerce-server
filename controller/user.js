const path = require('path');
const ErrorHandler = require('../utils/ErrorHandler');
const userModel = require("../model/user");
const UserService = require("../services/user/user");
const userService = new UserService();
class UserController{
    
    constructor(){
    
    }
    async createUser(req, res, next){
        try{
            return userService.createUser(req,res,next);
        }catch(err){
            console.log("CREATE USER ERROR", console.log(this.userService))
        }
        console.log("THE USER SERVICE", userService)
       
    }

    async verifyUserEmail(req, res, next){
        try{

            await userService.verifyUserEmail(req,res,next);
        }catch(err){
            console.log("i WAS CAUGHT", err)
            next(new ErrorHandler('Token has expired'))
        }
    }

    async loginUser(req,res, next){
        try{
            await userService.loginUser(req,res,next);
        }catch(err){
            next(new ErrorHandler(err.message, err.statusCode))
        }
    }

    async getUser(req,res,next){
        try{
            await userService.getUser(req,res,next);
        }catch(err){
            next(new ErrorHandler(err.message, err.statusCode))
        }
    }

}

module.exports = UserController;