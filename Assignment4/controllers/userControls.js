const userModel=require('../models/users')

const createUser=async(req,res)=>{
    const {name,email}=req.body;
    try{
        const user=await userModel.createUser(name, email);
        res.status(201).json(user)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const getAllUsers=async(req,res)=>{
    try{
        const user=await userModel.getAllUsers();
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const deleteUsers=async (req,res)=>{
    const { id }= req.params
    try{
        const user= await userModel.deleteUsers(id)
        console.log(user);
        if(!user){
            res.status(404).json({msg:`No resources with id: ${id}`})
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const findUser=async (req,res)=>{
    const { email }= req.body
    try{
        const user= await userModel.findUser(email)
        if(!resource){
            res.status(404).json({msg:`No resources with id: ${email}`})
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}

module.exports={
    getAllUsers,
    findUser,
    deleteUsers,
    createUser
}

