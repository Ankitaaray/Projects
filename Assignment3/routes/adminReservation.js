const express= require('express')
const router=express.Router()

const {get_all_reservation, delete_reservation}=require('../controllers/adminreservation')

router.route('/').get(get_all_reservation)
router.route('/:id').delete(delete_reservation)
module.exports=router;