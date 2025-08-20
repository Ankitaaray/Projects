const Reservation=require('../models/Resevation_pg_Schema');
const getAllReservations = async (req,res)=>{
    try{
        const reservation=await Reservation.get_all_reservations()
        res.status(200).json(reservation)
    }
    catch(err){
        console.log(err);
    }
}
const delete_reservation= async (req,res)=>{
    try{
        const {id:rID}=req.params
        const reservation=await Reservation.delete_reservation(rID)
        if(!reservation){
            res.status(404).json({msg:`No reservations with id: ${rID}`})
        }
        res.status(200).json(reservation)
    }
    catch(err){
        res.status(500).json(err)
    }
}
const get_single_reservation= async (req,res)=>{
    try{
        const {id:rID}=req.params
        const reservation=await Reservation.get_reservation(rID)
        if(!reservation){
            res.status(404).json({msg:`No reservations with Resource id: ${rID}`})
        }
        res.status(200).json(reservation)
    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports={getAllReservations, delete_reservation, get_single_reservation}
