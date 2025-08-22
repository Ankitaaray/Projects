const Reservation=require('../models/ResevationPgSchema');
const Resource=require('../models/ResourcePgSchema');

const getUserReservation=async(req,res)=>{
    const userID=req.user.id;
    const reservations=await Reservation.getReservationByUser(userID)
    res.status(200).json(reservations)
};
const createReservation=async(req,res)=>{
    const userID=req.user.id;
    const {ResourceId, startTime, endTime}=req.body;
    const resource=await Resource.getResource(ResourceId)
    if(!resource){
        return res.status(404).json({msg:'Resource not found'});
    }
    const reservation=await Reservation.createReservation(ResourceId, userID, startTime, endTime);
    res.status(200).json(reservation)
};
const deleteReservation=async(req,res)=>{
    const userID=req.user.id;
    const rID=req.params.id
    const reservation=await Reservation.deleteReservationByUser(rID,userID)
    if(!reservation){
        res.status(404).json({msg:`No reservations with id: ${rID}, made by the current user with id: ${userID}`})
    }
    res.status(200).json(reservation)

}
module.exports={getUserReservation, createReservation, deleteReservation}