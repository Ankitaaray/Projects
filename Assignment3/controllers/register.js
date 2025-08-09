const Users=require('../models/UserSchema')
require('dotenv').config()
const jwt=require('jsonwebtoken')

const register=async(req,res,next)=>{
    const{id,name, password, email,role}=req.body
    console.log('JWT_SECRET:',process.env.JWT_SECRET)
    if(!name||!password){
        throw new customAPIError('Please provide username & password',400)
    }
    const user=await Users.create({
        name,
        password,
        email,
        role
    })
    const token=jwt.sign(
        {id:user._id,username:user.name,role:user.role,password:user.password,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.status(201).json({token});
}
module.exports=register