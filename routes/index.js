const express = require("express")
const app =express()

// routes
const userRoute = require("./user")
const authRoute = require("./auth")
const productsRoute = require("./product")
const cartRoute = require("./cart")
const orderRoute = require("./order")
const stripeRoute = require("./stripe")


app.use(express.json())
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/products",productsRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)
app.use("/api/stripe",stripeRoute)
module.exports=app;