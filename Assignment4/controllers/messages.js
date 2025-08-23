const Messages=require('../models/messages')

const saveMessage=async(req,res)=>{
    const {user_id,message}=req.body;
    try{
        const message=await Messages.saveMessage(user_id,message);
        res.status(201).json(message)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const getAllMessages=async(req,res)=>{
    try{
        const message=await Messages.getAllMessages();
        res.status(200).json(message)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const deleteMessage=async (req,res)=>{
    const { id }= req.params
    try{
        const message= await Messages.deleteMessage(id)
        if(!message){
            res.status(404).json({msg:`No resources with id: ${id}`})
        }
        res.status(200).json(message);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}



module.exports={
    getAllMessages,
    saveMessage,
    deleteMessage
}