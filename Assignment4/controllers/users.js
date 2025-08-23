const User=require('../models/users')

const createUser=async(req,res)=>{
    const {username,email}=req.body;
    try{
        const user=await User.createUser(username,email);
        res.status(201).json(user)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const getAllUsers=async(req,res)=>{
    try{
        const user=await User.getAllUsers();
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const deleteUser=async (req,res)=>{
    const { id }= req.params
    try{
        const user= await User.deleteUsers(id)
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

const updateUser=async (req,res)=>{
    const { id }= req.params
    const{name}=req.body
    try{
        const user= await User.updateUser(id,name)
        if(!user){
            res.status(404).json({msg:`No task with id: ${id}`})
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}

module.exports={
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}