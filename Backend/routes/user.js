const express = require('express')
const { body, validationResult } = require('express-validator');

const router = express.Router()
const User = require('../models/user')


// API TO CREATE NEW USER
router.post('/createUser',[
    body('id', 'Enter a valid id').isLength({ min: 10 , max:10 }),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Email must be in Email form ').isEmail(),
] ,async (req, res) => {
    const {id,name,email} = req.body;
    // res.send({msg:"User Added Successfully",AddedUser:req.body})
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return  res.send({ errors: result.array() });
    }
    const findUser = await User.findOne({email:email})
    if(findUser) {
        return res.status(400).json({error:"Email alerady exist"})
    }
      try {
          const user = await User.create({
            id:id,
            name:name,
            email:email
          })
          console.log(user);
          res.send(user)
      } catch (error) {
        console.error({msg:"error occured",error:error});
      }
  })

  //API TO FETCH ALL USER DATA 

  router.get("/fetchUser",async(req,res)=>{
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.error({ msg: "Error fetching users", error: error });
        res.status(500).send("Internal Server Error");
    }
  })
  

  // API TO DELETE USER 
router.delete("/deleteUser/:id",async(req,res)=>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.send(deleteUser)
    } catch (error) {
        return res.status(500).send({msg:"internal server error",error})
    }
})

//API TO EDIT NOTE

router.put("/editNote/:id",[
    body('id', 'Enter a valid id').isLength({ min: 10 , max:10 }),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Email must be in Email form ').isEmail(),
],async(req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    const {id,name,email}=req.body;
    // const findbyid = await User.findOne({id:id});
    // if(findbyid){
    //     return res.status(400).json({msg:"User with this roll no already exist"})
    // }
    // const findbyemail= await User.findOne({email:email});
    // if(findbyemail){
    //     return res.status(400).json({msg:"User with this email already exist"})
    // }
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {$set:{id:id,name:name,email:email}},
        {new:true}
    )
    res.send(user);
})
  module.exports = router;