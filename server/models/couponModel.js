const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userModel = require("./userRegModel")

const userSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    couponId: {
        type: String,
        required: [true, "couponId is required"],
        unique: true
    },
    createdBy: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    percent:{
        type: String,
        required: [true, "coupon amount is required"],
    },
    isCouponApproved:{
        type: Boolean,
        default: false
    },
    couponType: {
        type: String,
        default:"open"
    }
},
{ 
    timestamp: true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals: true
    }
}
    )





const couponModel = mongoose.model("coupon", userSchema)

module.exports = couponModel  