const express= require('express')
const router=express.Router()

const {getAllReservations, deleteReservation}=require('../controllers/pgAdminReservation')

router.route('/').get(getAllReservations)
router.route('/:id').delete(deleteReservation)
module.exports=router;