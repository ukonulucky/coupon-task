const crypto = require("crypto")


const couponCode = crypto.randomUUID()


console.log(couponCode)
module.exports ={
    couponCode
}