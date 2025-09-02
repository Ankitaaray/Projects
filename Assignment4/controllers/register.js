const {createUser}=require('../models/users')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const customAPIError=require('../errors/customError')
const bcrypt=require('bcrypt')

const register=async(req,res)=>{
    console.log(req.body)
    const{name, email, password}=req.body
    // const userData=req.body
    console.log('JWT_SECRET:',process.env.JWT_SECRET)

    if(!name||!email||!password){
        throw new customAPIError('Please provide required credentials',400)
    }

    
    const hashed_password=await bcrypt.hash(password,10)
    const user=await createUser(name,email,hashed_password)

    if(!user){
        throw new customAPIError('Please provide required credentials',400)
    }

    const token=jwt.sign(
        {id:user.id, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.status(201).json({token});
}
module.exports=register