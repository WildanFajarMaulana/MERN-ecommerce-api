const { verifyTokenAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router()
const User = require("./../models/User")
const CryptoJS = require( "crypto-js")

// update
router.put("/:id",verifyTokenAuthorization,async (req,res)=>{
   if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
   }
   try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser)
   }catch(e){
        res.status(500).json(e)
   }
})

// delete
router.delete("/:id",verifyTokenAuthorization,async(req,res)=>{
     try{
          await User.findByIdAndDelete(req.params.id)
          res.status(200).json("User has been deleted...")
     }catch(e){
          res.status(500).json(e)
     }
})

// get 1 user
router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
     try{
          const user=await User.findById(req.params.id)
          const {password,...others}=user._doc
          res.status(200).json(others)
     }catch(e){
          res.status(500).json(e)
     }
})


// get all user
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
     const query = req.query.new
     try{
          const users=query?await user.find().sort({_id:-1}).limit(1) : await User.find()
          
          res.status(200).json(users)
     }catch(e){
          res.status(500).json(e)
     }
})


// get user stats
router.get("/stats",verifyTokenAndAdmin,async(req,res)=>{
     const date = new Date()
     const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

     try{
          const data = await User.aggregate([
               {$match:{createdAt:{$gte:lastYear}}},
               {
                    $project:{
                         month:{$month:"$createdAt"},
                    },
               },
               {
                    $group:{
                         _id:"$month",
                         total:{$sum:1}
                    }
               }
          ]);
          res.status(200).json(data)
     }catch(e){
          res.status(500).json(e)
     }
})




module.exports = router;