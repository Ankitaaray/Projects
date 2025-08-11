const Reservation=require('../models/ResevationSchema');
const get_all_reservation = async (req,res)=>{
    try{
        const reservation=await Reservation.find({})
        res.status(200).json({reservation})
    }
    catch(err){
        console.log(err);
    }
}
const delete_reservation= async (req,res)=>{
    try{
        const {id:rID}=req.params
        const reservation=await Reservation.findOneAndDelete({_id:rID})
        if(!reservation){
            res.status(404).json({msg:`No reservations with id: ${rID}`})
        }
        res.status(200).json({reservation})
    }
    catch(err){
        res.status(500).json(err)
    }
}
const create_reservation= async(req,res)=>{
    try {
        const reservation= await Reservation.create(req.body)
        res.status(200).json({reservation});
    } catch (error) {
        res.status(500).json(err);
    }
}
module.exports={get_all_reservation, delete_reservation, create_reservation}
