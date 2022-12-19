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
        required: [true, "email is required"],
        unique: true
    },
    passWord: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
       default: "admin"
    },
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


userSchema.methods.isPasswordMatch = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.passWord)
}
const adminModel = mongoose.model("admin", userSchema)

module.exports = adminModel 