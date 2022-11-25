const express = require("express")
const app =express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const routeAll= require("./routes/index")

// init env
dotenv.config()
 
// connect db
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(5000,()=>{
            console.log("running")
        })
    }).catch((err)=>{
        console.log(err)
    })

// init routes
app.use(cors())
app.use(routeAll)


// app.use("/api/auth",authRoute)
