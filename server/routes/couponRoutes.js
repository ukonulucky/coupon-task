const express = require('express');
const { createCoupon, getAllCoupons, activateVendorCoupon, createCouponForVendor } = require('../controlers/couponControler');
const { getCouponsForUnsersBasedOnStatus } = require('../controlers/regControler');
const checkIfUserLoggedIn = require('../middleware/checkIfUserIsLoggedIn');


const couponRouter  = express.Router()

couponRouter.post("/generateCoupon", checkIfUserLoggedIn ,createCoupon)

couponRouter.get("/getAllCoupons",checkIfUserLoggedIn, getAllCoupons)

couponRouter.get("/activateCoupons/:id", checkIfUserLoggedIn, activateVendorCoupon)

couponRouter.get("/getCouponsOnStatus", checkIfUserLoggedIn, getCouponsForUnsersBasedOnStatus)

couponRouter.post("/createCouponForVendor", checkIfUserLoggedIn, createCouponForVendor)

module.exports = {
    couponRouter
}