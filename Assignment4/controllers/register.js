const {createUser}=require('../models/users')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const customAPIError=require('../errors/customError')

const register=async(req,res)=>{
    console.log(req.body)
    const{name, email}=req.body
    // const userData=req.body
    console.log('JWT_SECRET:',process.env.JWT_SECRET)

    if(!name||!email){
        throw new customAPIError('Please provide required credentials',400)
    }

    const user=await createUser(name,email)

    if(!user){
        throw new customAPIError('Please provide required credentials',400)
    }

    const token=jwt.sign(
        {id:user.id, username:user.name, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.status(201).json({token});
}
module.exports=register