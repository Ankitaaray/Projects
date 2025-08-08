const customAPIError=require('../errors/custom-error')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const login=async (req,res)=>{
    const{id,username, password, email,role}=req.body
    console.log('JWT_SECRET:',process.env.JWT_SECRET)
    // console.log('CWD:', process.cwd())

    if(!username||!password){
        throw new customAPIError('Please provide username & password',400)
    }


    const token= jwt.sign({id, username, email, password,role},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.status(200).json({msg:'token created', token})
}
module.exports=login;