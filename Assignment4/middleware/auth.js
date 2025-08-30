const jwt=require('jsonwebtoken')
require('dotenv').config()
const customAPIError=require('../errors/customError')
const { findUser } = require('../models/users')

const authMiddleware=async (req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.redirect("/login.html")
    }

    const token=authHeader.split(' ')[1]

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const {email}=decoded
        const user=await findUser(email);
        
        req.user={id:user.id,username:user.user_name,email:user.email,password:user.password}
        next()
    } catch (error) {
        return res.redirect("/login.html")
    }
    
}
module.exports=authMiddleware