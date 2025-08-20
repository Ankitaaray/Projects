const express= require('express')
const router=express.Router()

const {getAllReservations, delete_reservation}=require('../controllers/pgadminreservation')

router.route('/').get(getAllReservations)
router.route('/:id').delete(delete_reservation)
module.exports=router;