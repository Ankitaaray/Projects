const customAPIError=require('../errors/custom-error')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const Users=require('../models/UserSchema')
const login=async (req,res)=>{
    const{email, password}=req.body
    const user=await Users.findOne({email,password});
    if(!email||!password){
        throw new customAPIError('Please provide email & password',400)
    }


    if(!user){
        throw new customAPIError('Invalid credentails',401)
    }
    const token=jwt.sign(
        {id:user._id,username:user.name,role:user.role,password:user.password,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
    res.status(200).json({token})

    
    // console.log('JWT_SECRET:',process.env.JWT_SECRET)
    // // console.log('CWD:', process.cwd())

    // if(!username||!password){
    //     throw new customAPIError('Please provide username & password',400)
    // }


    // const token= jwt.sign({id, username, email, password,role},process.env.JWT_SECRET,{expiresIn:'1d'})
    // res.status(200).json({msg:'token created', token})
}
module.exports=login;