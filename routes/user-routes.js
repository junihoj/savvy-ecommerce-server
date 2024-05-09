const express = require('express');
const {upload } = require('../multer');
const UserController = require('../controller/user');
const { isAuthenticated } = require('../middleware/auth');
const userRoutes = ()=>{
    const router = express.Router();
    const userController = new UserController()
    router.post('/create', userController.createUser)
    router.post('/verify-user-email', userController.verifyUserEmail)
    router.post('/login-user', userController.loginUser)
    router.get('/get-user', isAuthenticated, userController.getUser)
    return router;
}

module.exports = userRoutes;