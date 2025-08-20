const express= require('express')
const router=express.Router()
const {getAllResource,getResource,updateResource,createResource,deleteResource}=require('../controllers/pgadmincontrols')

router.route('/').get(getAllResource).post(createResource)
router.route('/:id').get(getResource).delete(deleteResource).patch(updateResource)
module.exports=router;