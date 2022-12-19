const express = require('express')
const { login, logout } = require('../controlers/loginControlers')
const { userRegister } = require('../controlers/regControler')

const userRouter = express.Router()

userRouter.post("/register", userRegister)
userRouter.post("/login", login)
userRouter.get("/logout",logout)

// userRouter.post("/login", userLogin)



module.exports = {
    userRouter
}
