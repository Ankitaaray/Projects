const Resource=require('../models/ResourceSchema');
const create_resource=async (req,res)=>{
    try{
        const resource= await Resource.create(req.body)
        res.status(200).json({resource});
    }
    catch(err){
        res.status(500).json(err);
    }
}
const get_resource=async(req,res)=>{
    try{
        const {id:rID}=req.params
        const resource=await Resource.findOne({_id:rID})
        if(!resource){
            res.status(404).json({msg:`No resource with id: ${rID}`})
        }
        res.status(200).json({resource})
    }
    catch(err){
        res.status(500).json(err)
    }
}
const delete_resource= async (req,res)=>{
    try{
        const {id:rID}=req.params
        const resource=await Resource.findOneAndDelete({_id:rID})
        if(!resource){
            res.status(404).json({msg:`No resource with id: ${rID}`})
        }
        res.status(200).json({resource})
    }
    catch(err){
        res.status(500).json(err)
    }
}
const update_resource= async (req,res)=>{
    try{
        const {id:rID}=req.params
        const resource=await Resource.findOneAndUpdate({_id:rID},req.body,{
            new:true,
            runValidators:true
        })
        if(!resource){
            res.status(404).json({msg:`No resource with id: ${rID}`})
        }
        res.status(200).json({resource})
    }
    catch(err){
        res.status(500).json(err)
    }
}
const get_all_resource = async (req,res)=>{
    try{
        const resource=await Resource.find({})
        res.status(200).json({resource})
    }
    catch(err){
        console.log(err);
    }
}
module.exports={
    create_resource,
    update_resource,
    delete_resource,
    get_all_resource,
    get_resource
}