const express=require('express')
const router=express.Router()
const login=require('../controllers/login')
const register=require('../controllers/register')

router.route('/register').post(register)
router.route('/login').post(login)

module.exports=router 