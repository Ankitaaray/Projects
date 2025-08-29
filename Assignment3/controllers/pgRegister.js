const {createUser}=require('../models/userPgSchema')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const customAPIError=require('../errors/customError')
const Joi = require('joi')

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  role:Joi.string().valid('admin', 'user').required()
});

const register=async(req,res)=>{
    console.log(req.body)
    const{name, password, email,role}=req.body
    // const userData=req.body
    console.log('JWT_SECRET:',process.env.JWT_SECRET)

    if(!name||!password ||!email ||!role){
        throw new customAPIError('Please provide required credentials',400)
    }
    const validationResult = userSchema.validate({name:name, email:email, password:password, role:role})
    if(validationResult.error){
        throw new customAPIError(validationResult.error.message,400)
    }

    const rounds=10
    hashed_password=await bcrypt.hash(password,rounds)
    console.log('Checkpoint 1')
    const user=await createUser(name,email,hashed_password,role)

    const token=jwt.sign(
        {id:user.id, username:user.name, role:user.role, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.status(201).json({token});
}
module.exports=register