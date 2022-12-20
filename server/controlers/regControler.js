const { response } = require("express")
const expressAsyncHandler = require("express-async-handler")
const asyncHandler = require("express-async-handler")
const couponModel = require("../models/couponModel")
const userModel = require("../models/userRegModel")
const validateId = require("../utils/validateId")



const userRegister = asyncHandler(
    async (req, res) => {
        console.log(req.body)
            const { firstName, lastName, passWord, email, role} = req.body
    
        if(role === "user"){
            const oldUser = await userModel.findOne({ email, role:"user" })
            if (oldUser) {
                res.statusCode = 404
                throw new Error("user allready exist")
            }
            const user = await userModel.create({
                firstName, lastName, passWord, email, role
            })
            res.status(201).json(user)
        }
        if(role === "vendor"){
           throw new Error("Vendors can only be created by logged in adminstrator")
        }
        if(role === "admin"){
            const oldUser = await userModel.findOne({ email, role:"admin" })
            if (oldUser) {
                throw new Error("admin allready exist")
            }
            const user = await userModel.create({
                firstName, lastName, passWord, email, role, userStatus:"premium"
            })
            res.status(201).json(user)
        }
    }
)

const registerVendor = expressAsyncHandler(async(req, res) => {
try {
    const {email, firstName, lastName, role, passWord} = req.body
    if(role === "vendor"){

        const {_id : id} =  req.user
       validateId(id)
        const isAdmin = await userModel.findById(id)
        if(!isAdmin || isAdmin.role !== "admin"){
            throw new Error("only Admin can create a vendor")
        }
        const oldUser = await userModel.findOne({ email, role:"vendor" })
        if (oldUser) {
            throw new Error("vendor allready exist")
        }
        const user = await userModel.create({
            firstName, lastName, passWord, email, role
        })
        res.status(201).json(user)
    }else{
        throw new Error("endpoint only for vendor registration")
    }
} catch (error) {
    throw new Error(error.message)
}
})

const createPremiumUser = expressAsyncHandler(async() => {
    const {_id} = req.user
    const {amount} = req.body
    try {
        const user = await userModel.findByIdAndUpdate(_id, {
            userStatus: "premium"
        },{
            new: true
        })
  if(!user){
    response.status(404).json({
        message: "User not found"
    })
    return
  }
  response.status(201).json({
    message: "User Status succefully updated to premium"
})
    } catch (error) {
        throw new Error(error.message)
    }
})

const getCouponsForUnsersBasedOnStatus = expressAsyncHandler(async(req, res) => {
    const {userStatus} = req.user
    if(userStatus !== "premium" || userStatus !== "subscribed" || userStatus !== "open"){
        throw new Error('Invalid user status')
        return
    }
try {
    if(userStatus === "subsribed"){
        const coupons = await couponModel.find({
         couponType : "hidden" || "open"
        })
        res.status(200).json(coupons)
  return
    }

    if(userStatus === "premium"){
        const coupons = await couponModel.fin({})
        res.status(200).json(coupons)
  return
    }
    const coupons = await couponModel.find({
        couponType : "open"
       })
    res.status(200).json(coupons)  
} catch (error) {
    throw new Error(error.message)
}
})
module.exports = {
    userRegister, registerVendor, createPremiumUser, getCouponsForUnsersBasedOnStatus
}