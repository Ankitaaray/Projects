const express= require('express')
const router=express.Router()
const {getAllTasks,updateTask,delete_task,create_task,get_task}=require('../controllers/Taskcontrols')

router.route('/').get(getAllTasks).post(create_task)
router.route('/:id').get(get_task).delete(delete_task).patch(updateTask)
module.exports=router;