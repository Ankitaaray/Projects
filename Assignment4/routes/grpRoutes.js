const express= require('express')
const router=express.Router()
const group= require('../controllers/grpControls')

router.route('/:id').get(group.findUserFromGrp)
router.route('/').post(group.createGroup).get(group.getUserAllGroups)

module.exports=router;