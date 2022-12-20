const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
       email: {
        type: String,
        required: [true, "email is required"]
    },
    passWord: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
       default: "user"
    },
    userStatus:{
        type: String,
        default:"subscribed"
    }
},
{
    timestamp: true
}
    )

userSchema.pre("save", async function (next) {
    if (!this.isModified("passWord")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.passWord = await bcrypt.hash(this.passWord, salt)
    next()

})

// creating a virtual fied for all the coupon made  by vendors and admins
userSchema.virtual("CouponCreated", {
    ref:"coupon",
    foreignField:"createdBy",
    localField:"_id",
    justOne:false  
})

userSchema.methods.isPasswordMatch = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.passWord)
}
const userModel = mongoose.model("User", userSchema)

module.exports = userModel