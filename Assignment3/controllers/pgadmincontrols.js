const {get_resource, create_resource, update_resource, delete_resource, get_all_resources}=require('../models/ResourcepgSchema')

const createResource=async(req,res)=>{
    const {name}=req.body;
    try{
        const newResource=await create_resource(name);
        res.status(201).json(newResource)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const getAllResource=async(req,res)=>{
    try{
        const resources=await get_all_resources();
        res.status(200).json(resources)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const deleteResource=async (req,res)=>{
    const { id }= req.params
    try{
        const resource= await delete_resource(id)
        console.log(resource);
        if(!resource){
            res.status(404).json({msg:`No resources with id: ${id}`})
        }
        res.status(200).json(resource);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const getResource=async (req,res)=>{
    const { id }= req.params
    try{
        const resource= await get_resource(id)
        if(!resource){
            res.status(404).json({msg:`No resources with id: ${id}`})
        }
        res.status(200).json(resource);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}

const updateResource=async (req,res)=>{
    const { id }= req.params
    const{name}=req.body
    try{
        const resource= await update_resource(id,name)
        if(!resource){
            res.status(404).json({msg:`No task with id: ${id}`})
        }
        res.status(200).json(resource);
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}

module.exports={
    getAllResource,
    getResource,
    createResource,
    deleteResource,
    updateResource
}