const adminModel = require("../models/adminModel");
const userModel = require("../models/userRegModel");
const vendorModel = require("../models/vendorRegModel copy");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");



const login =expressAsyncHandler(async (req, res) => {
  try {
    const {email, passWord, role} = req.body
    if(role === "admin") {
       const user = await adminModel.findOne({email: email})
       if (!user) return res.status(404).json({
        message:"Invalid login credentials"
       })
       const isPasswordMatch = await user.isPasswordMatch(passWord)
       if(!isPasswordMatch) return res.status(404).json({
        message:"Invalid login credentials"
       })
       const {_id} = user
     const jwt_token =  jwt.sign({_id}, process.env.SECRET_KEY,{
        expiresIn:24 * 60 * 60 
       })
       res.cookie("user-login",jwt_token, {  maxAge: 24 * 60 * 60 * 1000})
       res.status(200).json({
        id:user._id
       })

    }
    if(role === "vendor") {
        const user = await vendorModel.findOne({email: email})
        if (!user) return res.status(404).json({
         message:"Invalid login credentials"
        })
        const isPasswordMatch = await user.isPasswordMatch(passWord)
        if(!isPasswordMatch) return res.status(404).json({
         message:"Invalid login credentials"
        })
        const {_id} = user
      const jwt_token =  jwt.sign({_id}, process.env.SECRET_KEY,{
         expiresIn:24 * 60 * 60
        })
        res.cookie("user-login",jwt_token, {  maxAge: 24 * 60 * 60 * 1000})
        res.status(200).json({
         id:user._id
        })
 
     }
     if(role === "user") {
        const user = await userModel.findOne({email: email})
        if (!user) return res.status(404).json({
         message:"Invalid login credentials"
        })
        const isPasswordMatch = await user.isPasswordMatch(passWord)
        if(!isPasswordMatch) return res.status(404).json({
         message:"Invalid login credentials"
        })
        const {_id} = user
      const jwt_token =  jwt.sign({_id}, process.env.SECRET_KEY,{
         expiresIn:24 * 60 * 60
        })
        res.cookie("user-login",jwt_token, {  maxAge: 24 * 60 * 60 * 1000})
        res.status(200).json({
         id:user._id
        })
 
     } else{
        res.status(404).json({
            message:"role is required"
        })
     }
  } catch (error) {
    throw new Error(error.message)
  }
})

const logout = (req, res) => {
    res.cookie("user-login", "", {
        maxAge:1
    })
 res.status(200).json({
    message: "You have been logged out"
 })
}

module.exports = {
    login, logout
}