const customAPIError=require('../errors/customError')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {findUser}=require('../models/userPgSchema')
const login=async (req,res)=>{
    const userData=req.body
    
    if(!userData.email||!userData.password){
        throw new customAPIError('Please provide email & password',400)
    }
    
    const user=await findUser(userData.email);
    if(!user||!bcrypt.compare(userData.password,user.password)){
        throw new customAPIError('Invalid credentails',401)
    }
    const token=jwt.sign(
        {id:user.id,username:user.name,role:user.role,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.status(200).json({token})
}
module.exports=login;