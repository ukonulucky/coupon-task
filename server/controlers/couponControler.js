const crypto = require('crypto');
const { response } = require('express');
const expressAsyncHandler = require("express-async-handler")
const couponModel = require("../models/couponModel")
const userModel = require("../models/userRegModel");
const validateId = require('../utils/validateId');
const { registerVendor } = require('./regControler');



const createCoupon = expressAsyncHandler(async (req, res) => {
    const couponCode = crypto.randomUUID()
    const {_id } = req.user
 const {category, state,percent} = req.body
    try {
        if(req.user.role === "user"){
            throw new Error("coupon can only be created by a vendor or admin")
        }
        const createCoupon = await couponModel.create({
            ...req.body, createdBy: _id, couponId: couponCode, isCouponApproved: req.user.role === "admin" ? true : false
        })
        if(!createCoupon){
            throw new Error("Coupon Creation failed Please try again")
          
        }
        res.status(201).json(createCoupon)
     
    } catch (error) {
        throw new Error(error.message)
    }
})


const createCouponForVendor = expressAsyncHandler(async (req, res) => {
    const couponCode = crypto.randomUUID()
 const {category, state,percent, _id} = req.body
    try {
        if(req.user.role === "user"){
            throw new Error("coupon can only be created by a vendor or admin")
        }
        const createCoupon = await couponModel.create({
            ...req.body, createdBy: _id, couponId: couponCode, isCouponApproved: req.user.role === "admin" ? true : false
        })
        if(!createCoupon){
            throw new Error("Coupon Creation failed Please try again")
          
        }
        res.status(201).json(createCoupon)
     
    } catch (error) {
        throw new Error(error.message)
    }
})


const getAllCoupons = expressAsyncHandler(async(req, res) => { 
    if(req.user.role !== 'admin'){
        res.status(404).json({
            message:"Please Login as an Admin"
        })
        return
    }
  try {
    const allCoupons = await couponModel.find({}).populate("createdBy")
    if(!allCoupons){
        response.status(404).json({
            message: 'Coupon not found'
        })
    }
    res.status(200).json(allCoupons)
     
  } catch (error) {
    throw new Error(error.message)
  }
})

const activateVendorCoupon = expressAsyncHandler(async(req,res) => {
const {id} = req.params
console.log(id)
if(req.user.role !== "admin"){
    throw new Error("You must be an admin to activate")
}

try {
    validateId(id)
    const getCoupons = await couponModel.findByIdAndUpdate(id, {
        isCouponApproved: true
        }, {
            new: true
        })

    if(!getCoupons) {
    res.status(404).json({
        message:"coupon not found",
    })
    return
    }
res.status(200).json({
    message:"coupon successfully updated"
})

} catch (error) {
    throw new Error(error.message)
}
})



module.exports = {
    createCoupon, getAllCoupons, activateVendorCoupon, createCouponForVendor
}
