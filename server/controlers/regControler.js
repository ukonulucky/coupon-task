const asyncHandler = require("express-async-handler")
const adminModel = require("../models/adminModel")
const userModel = require("../models/userRegModel")
const vendorModel = require("../models/vendorRegModel copy")


const userRegister = asyncHandler(
    async (req, res) => {
        

            const { firstName, lastName, passWord, email,role} = req.body
            if(!role){
              throw new Error("user role is required")
            }
        
        if(role === "user"){
            const oldUser = await userModel.findOne({ email })
            if (oldUser) {
                throw new Error("user allready exist")
            }
            const user = await userModel.create({
                firstName, lastName, passWord, email
            })
            res.status(201).json(user)
        }
        if(role === "vendor"){
            const oldUser = await vendorModel.findOne({ email })
            if (oldUser) {
                throw new Error("vendor allready exist")
            }
            const user = await vendorModel.create({
                firstName, lastName, passWord, email
            })
            res.status(201).json(user)
        }
        if(role === "admin"){
            const oldUser = await adminModel.findOne({ email })
            if (oldUser) {
                throw new Error("admin allready exist")
            }
            const user = await adminModel.create({
                firstName, lastName, passWord, email
            })
            res.status(201).json(user)
        }
    }
)


module.exports = {
    userRegister
}