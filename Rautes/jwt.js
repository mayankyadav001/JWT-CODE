const express=require("express")
const {userSignup,loginUser} =require("../controllers/userAuthentication/userAuthentication")

const root=express.Router()

root.post("/add/data",userSignup)
root.post('/userlogin',loginUser)

module.exports={ root }