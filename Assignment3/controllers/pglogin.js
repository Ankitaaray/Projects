const customAPIError=require('../errors/custom-error')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const {findUser}=require('../models/UserPgSchema')
const login=async (req,res)=>{
    const{email, password}=req.body
    
    if(!email||!password){
        throw new customAPIError('Please provide email & password',400)
    }
    
    const user=await findUser(email,password);
    if(!user){
        throw new customAPIError('Invalid credentails',401)
    }
    const token=jwt.sign(
        {id:user.id,username:user.name,role:user.role,password:user.password,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.status(200).json({token})
}
module.exports=login;