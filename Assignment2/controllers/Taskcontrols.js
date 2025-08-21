const Task=require('../models/TaskShema');
const create_task=async (req,res)=>{
    try{
        const task= await Task.create(req.body)
        res.status(200).json({task});
    }
    catch(err){
        res.status(500).json(err);
    }
}
const get_task=async(req,res)=>{
    try{
        const {id:taskID}=req.params
        const task=await Task.findOne({_id:taskID})
        if(!task){
            res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})
    }
    catch(err){
        res.status(500).json(err)
    }
}
const delete_task= async (req,res)=>{
    try{
        const {id:taskID}=req.params
        const task=await Task.findOneAndDelete({_id:taskID})
        if(!task){
            res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})
    }
    catch(err){
        res.status(500).json(err)
    }
}
const updateTask= async (req,res)=>{
    try{
        const {id:taskID}=req.params
        const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        })
        if(!task){
            res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})
    }
    catch(err){
        res.status(500).json(err)
    }
}
const getAllTasks = async (req,res)=>{
    try{
        const task=await Task.find({})
        res.status(200).json({task})
    }
    catch(err){
        console.log(err);
    }
}
module.exports={
    create_task,
    delete_task,
    get_task,
    getAllTasks,
    updateTask
}