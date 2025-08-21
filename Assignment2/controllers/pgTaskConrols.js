const taskModel=require("../models/pgTaskModels")
const createTask=async(req,res)=>{
    const {name, completed}=req.body;
    try{
        const newTask=await taskModel.create_task(name, completed);
        res.status(201).json(newTask)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const getAllTasks=async(req,res)=>{
    const {name, completed}=req.body;
    try{
        const task=await taskModel.get_all_task();
        res.status(200).json(task)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const deleteTasks=async (req,res)=>{
    const { id }= req.params
    try{
        const task= await taskModel.delete_task(id)
        console.log(task);
        if(!task){
            res.status(404).json({msg:`No task with id: ${id}`})
        }
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}

const getSingleTask=async (req,res)=>{
    const { id }= req.params
    try{
        const task= await taskModel.get_task(id)
        if(!task){
            res.status(404).json({msg:`No task with id: ${id}`})
        }
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}

const updateTask=async (req,res)=>{
    const { id }= req.params
    const{name, completed}=req.body
    try{
        const task= await taskModel.update_task(id,name,completed)
        if(!task){
            res.status(404).json({msg:`No task with id: ${id}`})
        }
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}


module.exports={
    createTask,
    getAllTasks,
    deleteTasks,
    getSingleTask,
    updateTask
};