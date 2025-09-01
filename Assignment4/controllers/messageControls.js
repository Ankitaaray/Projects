const msgModel=require('../models/messages')

const saveMessage=async(req,res)=>{
    const {id,user_name,message}=req.body;
    try{
        const Message=await msgModel.saveMessage(id,user_name, message);
        res.status(201).json(Message)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const getAllMessages=async(req,res)=>{
    try{
        const message=await msgModel.getAllMessages();
        res.status(200).json(message)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const deleteMessage=async (req,res)=>{
    const { id }= req.params
    try{
        const message= await msgModel.deleteMessage(id)
        console.log(message);
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

