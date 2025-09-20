const groupModel=require('../models/grp')

const createGroup=async(req,res)=>{
    const {grp_name,users}=req.body;
    try{
        const group=await groupModel.createGroup(grp_name, users);
        res.status(201).json(group)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const findUserFromGrp=async(req,res)=>{
    const{id}=req.params;
    try{
        const group=await groupModel.findUserFromGrp(id);
        res.status(200).json(group);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const getUserAllGroups=async(req,res)=>{
    const id=req.user.id;
    console.log("ID:",id)
    
    try{
        const group=await groupModel.getUserAllGroups(id);
        res.status(200).json(group);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
module.exports={
    createGroup,
    findUserFromGrp,
    getUserAllGroups
}