const express=require('express')
const router=express.Router()
const login=require('../controllers/login')
const register=require('../controllers/register')
const authMiddleware = require('../middleware/auth')
const profile=require('../controllers/profile')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/profile').get(authMiddleware,profile)

module.exports=router 