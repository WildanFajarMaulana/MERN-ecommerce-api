const { verifyTokenAuthorization, verifyTokenAndAdmin, verifyToken} = require("./verifyToken");

const router = require("express").Router()
const Cart = require("./../models/Cart")


// create
router.post("/",verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
         const savedCart = await newCart.save()
         res.status(200).json(savedCart)
    }catch(e){
         res.status(500).json(e)
    }
})

// update

router.put("/:id",verifyTokenAuthorization,async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedCart)
   }catch(e){
        res.status(500).json(e)
   }
})

// delete
router.delete("/:id",verifyTokenAuthorization,async(req,res)=>{
    try{
         await Cart.findByIdAndDelete(req.params.id)
         res.status(200).json("Cart has been deleted...")
    }catch(e){
         res.status(500).json(e)
    }
})

// get 1 user cart
router.get("/find/:userId",verifyTokenAuthorization,async(req,res)=>{
    try{
         const cart=await Cart.findOne({userId:req.params.userId})
         res.status(200).json(cart)
    }catch(e){
         res.status(500).json(e)
    }
})


// get all 
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
       const carts = await Cart.find();
       res.status(200).json(carts)
    }catch(e){
         res.status(500).json(e)
    }
})


module.exports = router;