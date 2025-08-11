const express= require('express')
const router=express.Router()

const {get_all_reservation, create_reservation, delete_reservation}=require('../controllers/UserReservation')

router.route('/my').get(get_all_reservation)
router.route('/:id').delete(delete_reservation)
router.route('/').post(create_reservation)

module.exports=router;