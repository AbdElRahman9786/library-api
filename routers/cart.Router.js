const express=require('express')

const router=express.Router()



const bookHandler=require('../controllers/cart.controller')
const authMiddleware = require('../middleware/auth')
const allowTo = require('../middleware/allowto ')
router.get('/api/cart', authMiddleware, allowTo('user',"admin"), bookHandler.getcartdata)
router.post('/api/cart',authMiddleware, allowTo('user','admin'),bookHandler.addbooktocart)
router.delete('/api/cart',authMiddleware, allowTo('user','admin'),bookHandler.deltetitemfromcart)




module.exports=router