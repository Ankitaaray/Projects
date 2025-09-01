const express= require('express')
const router=express.Router()
const User= require('../controllers/userControls')

router.route('/').get(User.getAllUsers).post(User.createUser)
router.route('/:id').get(User.findUser).delete(User.deleteUsers)
module.exports=router;