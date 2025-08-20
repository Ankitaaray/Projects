const express= require('express')
const router=express.Router()

const {getUserReservation, createReservation, deleteReservation}=require('../controllers/pguserreservation')

router.route('/my').get(getUserReservation)
router.route('/:id').delete(deleteReservation)
router.route('/').post(createReservation)

module.exports=router;