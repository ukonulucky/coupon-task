require("dotenv").config()
const cors = require("cors")
const express = require("express")
const dbConnect = require("./config/dbConnect")
const {errorHandler, noteFoundError} = require("./middleware/error")
// const userRouter = require("./routes/user/userRoutes")
const cookieParser = require("cookie-parser")
const { userRouter } = require("./routes/regRoutes")
const { couponRouter } = require("./routes/couponRoutes")
// const { postRouth } = require("./routes/post/postRouth")



const app = express()

const corsOptions = {
  origin:'https://coupon-task-8c9u.vercel.app/', 
    credentials: true,
    optionSuccessStatus:200
  
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
// user routes
// app.use("/api/user", userRouter)

 //regster routes
app.use("/api/user",userRouter)
app.use("/api/coupon", couponRouter)

// Middleware Creation 
app.use(noteFoundError)
app.use(errorHandler)
// creating server
 const Port = process.env.PORT || 5000



const serverConnect = async () => {
  try {
      const res = await dbConnect()
      if (res) {
          app.listen(Port, () => {
              console.log(`db connected and server running on port ${Port}`)
          })
      }
  } catch (error) {
    console.log(error.message)
  }
}

serverConnect()
