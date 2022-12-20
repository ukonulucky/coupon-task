
const userModel = require("../models/userRegModel");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");



const login = expressAsyncHandler(async (req, res) => {
  try {
    const {email, passWord, role} = req.body
    if(role === "admin") {
       const user = await userModel.findOne({email,role:"admin"})
       if (!user) return res.status(404).json({
        message:"Invalid login credentials or user not found"
       })
       const isPasswordMatch = await user.isPasswordMatch(passWord)
       if(!isPasswordMatch) return res.status(404).json({
         message:"Invalid login credentials or user not found"
       })
       const {_id} = user
     const jwt_token =  jwt.sign({_id}, process.env.SECRET_KEY,{
        expiresIn:24 * 60 * 60 
       })
       res.cookie("user-login",jwt_token, {  maxAge: 24 * 60 * 60 * 1000})
       res.status(200).json(user)

    }
    if(role === "vendor") {
        const user = await userModel.findOne({email, role:"vendor"})
        if (!user) return res.status(404).json({
         message:"Invalid login credentials or user not found"
        })
        const isPasswordMatch = await user.isPasswordMatch(passWord)
        if(!isPasswordMatch) return res.status(404).json({
         message:"Invalid login credentials or user not found"
        })
        const {_id} = user
      const jwt_token =  jwt.sign({_id}, process.env.SECRET_KEY,{
         expiresIn:24 * 60 * 60
        })
        res.cookie("user-login",jwt_token, {  maxAge: 24 * 60 * 60 * 1000})
        res.status(200).json(user)
 
     }
     if(role === "user") {
        const user = await userModel.findOne({email: email, role:"user"})
        if (!user) return res.status(404).json({
         message:"Invalid login credentials or user not found"
        })
        const isPasswordMatch = await user.isPasswordMatch(passWord)
        if(!isPasswordMatch) return res.status(404).json({
         message:"Invalid login credentials or user not found"
        })
        const {_id} = user
      const jwt_token =  jwt.sign({_id}, process.env.SECRET_KEY,{
         expiresIn:24 * 60 * 60
        })
        res.cookie("user-login",jwt_token, {  maxAge: 24 * 60 * 60 * 1000})
        res.status(200).json(user)
 
     } else{
        res.status(404).json({
            message:"role is required"
        })
     }
  } catch (error) {
    throw new Error(error.message)
  }
})

const getAllUsers =expressAsyncHandler(async (req, res) => {
  try {
   const allUsers = await userModel.find({})
   if(allUsers){
       res.status(200).json(allUsers)
   }else{
    res.status(200).json({
      message:"No Registered Users"
    })
   }
  } catch (error) {
   throw new Error(error.message)
  }
} )
const logout = (req, res) => {
    res.cookie("user-login", "", {
        maxAge:1
    })
 res.status(200).json({
    message: "You have been logged out"
 })
}

module.exports = {
    login, logout, getAllUsers
}