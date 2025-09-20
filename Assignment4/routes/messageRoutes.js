const express= require('express')
const router=express.Router()
const message= require('../controllers/messageControls')

router.route('/').get(message.getAllMessages).post(message.saveMessage)
router.route('/:id').delete(message.deleteMessage).get(message.getUserMessages)
router.route('/group/:id').get(message.getGrpMessages)
module.exports=router;