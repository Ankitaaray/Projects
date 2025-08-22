const express= require('express')
const router=express.Router()
const {getAllResources,getResource,updateResource,createResource,deleteResource}=require('../controllers/pgAdminControls')

router.route('/').get(getAllResources).post(createResource)
router.route('/:id').get(getResource).delete(deleteResource).patch(updateResource)
module.exports=router;