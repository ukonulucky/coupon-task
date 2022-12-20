const express = require('express')
const { login, logout, getAllUsers } = require('../controlers/loginControlers')
const { userRegister, registerVendor } = require('../controlers/regControler')
const checkIfUserLoggedIn = require('../middleware/checkIfUserIsLoggedIn')

const userRouter = express.Router()

userRouter.post("/register", userRegister)
userRouter.post("/registervendor",checkIfUserLoggedIn, registerVendor)
userRouter.post("/login", login)
userRouter.get("/logout",logout)
userRouter.get("/getAllUsers",getAllUsers)

// userRouter.post("/login", userLogin)



module.exports = {
    userRouter
}
