const express= require('express')
const router=express.Router()
const {get_all_resource,update_resource,create_resource,delete_resource,get_resource}=require('../controllers/admincontrols')

router.route('/').get(get_all_resource).post(create_resource)
router.route('/:id').get(get_resource).delete(delete_resource).patch(update_resource)
module.exports=router;