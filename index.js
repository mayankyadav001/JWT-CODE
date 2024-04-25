const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.json())

let port=4400;

const {root}=require("../jwt1/Rautes/jwt")
app.use("/",root)




app.listen(port,()=>{
    console.log(`server is running ${port}`)
})
