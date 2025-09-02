const customAPIError=require('../errors/customError')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const {findUser}=require('../models/users')
const bcrypt=require('bcrypt')
const login=async (req,res)=>{
    const userData=req.body
    
    const user=await findUser(userData.email);
    if(!user || !bcrypt.compare(userData.password,user.password)){
        throw new customAPIError('Invalid credentails',401)
    }

    const token=jwt.sign(
        {id:user.id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.status(200).json({token})
}
module.exports=login;