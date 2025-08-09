const express=require('express')
const router=express.Router()
const authorise=require('../middleware/auth')
const login=require('../controllers/login')
const register=require('../controllers/register')
const profile=require('../controllers/profile')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile').get(authorise,profile)

module.exports=router 


