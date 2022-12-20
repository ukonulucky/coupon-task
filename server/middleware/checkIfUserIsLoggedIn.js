const jwt = require("jsonwebtoken")
const userModel = require("../models/userRegModel")
const expressAsyncHandler = require("express-async-handler")


const checkIfUserLoggedIn = expressAsyncHandler(async (req, res, next) => {
    const loginToken = req.cookies["user-login"]
  
    if (loginToken) {

        jwt.verify(loginToken, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.json("user not logged in")
                return
                
            }
            const { _id } = decoded
            console.log("this is the id", _id)
            if (_id) {
                const user = await userModel.findOne({ _id })
                if (!user) {
                    
                    throw new Error("user does not exist")
                }
             req.user = user
             next() 
            }
        }) 
    } else {
        throw new Error("user not logged in")
    }
}
)

module.exports = checkIfUserLoggedIn