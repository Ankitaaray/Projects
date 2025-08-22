const jwt=require('jsonwebtoken')
require('dotenv').config()
const customAPIError=require('../errors/customError')
const { findUser } = require('../models/userPgSchema')

const authMiddleware=async (req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new customAPIError('No tocken', 401)
    }

    const token=authHeader.split(' ')[1]

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const {email}=decoded
        const user=await findUser(email);

        // req.user={id,username,email, password,role}
        
        req.user={id:user.id,username:user.name,email:user.email,password:user.password,role:user.role}
        next()
    } catch (error) {
        throw new customAPIError('Not authorised user',401)
    }
    
}
module.exports=authMiddleware