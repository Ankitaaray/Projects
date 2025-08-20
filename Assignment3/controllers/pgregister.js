const {createUser}=require('../models/UserPgSchema')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const customAPIError=require('../errors/custom-error')

const register=async(req,res,next)=>{
    console.log(req.body)
    const{name, password, email,role}=req.body
    console.log('JWT_SECRET:',process.env.JWT_SECRET)
    if(!name||!password){
        throw new customAPIError('Please provide username & password',400)
    }
    const user=await createUser(name,email,password,role)
    const token=jwt.sign(
        {id:user.id, username:user.name, role:user.role, password:user.password, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.status(201).json({token});
}
module.exports=register