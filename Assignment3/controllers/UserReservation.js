const Reservation=require('../models/ResevationSchema');
const Resource=require('../models/ResourceSchema');

const get_all_reservation=async(req,res)=>{
    const userID=req.user.id;
    const reservations=await Reservation.find({user:userID})
    res.status(200).json({reservations})
};
const create_reservation=async(req,res)=>{
    const userID=req.user.id;
    const {ResourceID, startTime, endTime}=req.body;
    const resource=await Resource.findById(ResourceID)
    if(!resource){
        return res.status(404).json({msg:'Resource not found'});
    }
    const reservation=await Reservation.create({
        ResourceID,
        user:userID,
        startTime,
        endTime
    });
    res.status(200).json({reservation})
};
const delete_reservation=async(req,res)=>{
    const userID=req.user.id;
    const rID=req.params.id
    const reservation=await Reservation.findOneAndDelete({_id:rID,user:userID})
    if(!reservation){
        res.status(404).json({msg:`No reservations with id: ${rID}, made by the current user with id: ${userID}`})
    }
    res.status(200).json({reservation})

}
module.exports={get_all_reservation, create_reservation,delete_reservation}