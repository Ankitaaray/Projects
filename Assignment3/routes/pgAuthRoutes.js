const express=require('express')
const router=express.Router()
const authorise=require('../middleware/auth')
const login=require('../controllers/pgLogin')
const register=require('../controllers/pgRegister')
const profile=require('../controllers/profile')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile').get(authorise,profile)

module.exports=router 