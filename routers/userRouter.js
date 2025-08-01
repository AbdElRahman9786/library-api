const express=require('express')

const router=express.Router()

const userhandler=require('../controllers/user.controller')
const authmiddleware = require('../middleware/auth')
const allowto = require('../middleware/allowto ')


router.get('/api/users',authmiddleware,allowto('user'),userhandler.getAllUsers)
router.post('/api/users',userhandler.addUser)
router.post('/api/login',userhandler.loginUser)


module.exports=router