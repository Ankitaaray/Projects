const Reservation=require('../models/ResevationPgSchema');
const getAllReservations = async (req,res)=>{
    try{
        const reservation=await Reservation.getAllReservations()
        res.status(200).json(reservation)
    }
    catch(err){
        console.log(err);
    }
}
const deleteReservation= async (req,res)=>{
    try{
        const {id:rID}=req.params
        const reservation=await Reservation.deleteReservation(rID)
        if(!reservation){
            res.status(404).json({msg:`No reservations with id: ${rID}`})
        }
        res.status(200).json(reservation)
    }
    catch(err){
        res.status(500).json(err)
    }
}
const getSingleResrvation= async (req,res)=>{
    try{
        const {id:rID}=req.params
        const reservation=await Reservation.getReservation(rID)
        if(!reservation){
            res.status(404).json({msg:`No reservations with Resource id: ${rID}`})
        }
        res.status(200).json(reservation)
    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports={getAllReservations, deleteReservation, getSingleResrvation}
