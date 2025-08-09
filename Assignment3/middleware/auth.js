const jwt=require('jsonwebtoken')
require('dotenv').config()
const authMiddleware=async (req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new customAPIError('No tocken', 401)
    }

    const token=authHeader.split(' ')[1]

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const {id, username,email,password,role}=decoded
        // req.user={id,username,email, password,role}
        req.user={id,username,email,password,role}
        next()
    } catch (error) {
        throw new customAPIError('Not authorised user',401)
    }
    next()
    
}
module.exports=authMiddleware