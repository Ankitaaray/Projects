const Resource=require('../models/ResourcePgSchema')

const createResource=async(req,res)=>{
    const {name}=req.body;
    try{
        const newResource=await Resource.createResource(name);
        res.status(201).json(newResource)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const getAllResources=async(req,res)=>{
    try{
        const resources=await Resource.getAllResources();
        res.status(200).json(resources)
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const deleteResource=async (req,res)=>{
    const { id }= req.params
    try{
        const resource= await Resource.deleteResource(id)
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
        const resource= await Resource.getResource(id)
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
        const resource= await Resource.updateResource(id,name)
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
    getAllResources,
    getResource,
    createResource,
    deleteResource,
    updateResource
}