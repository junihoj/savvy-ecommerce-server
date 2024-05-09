const userRoutes = require("./user-routes")
const express = require('express');
const baseUrl = '/api'
const appRoutes = (app)=>{
    const userRouter = userRoutes();
    app.use(`${baseUrl}/user`, userRouter);
}

module.exports = appRoutes;