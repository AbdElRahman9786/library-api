const express=require('express')

const router=express.Router()



const bookHandler=require('../controllers/cart.controller')
const authMiddleware = require('../middleware/auth')
const allowTo = require('../middleware/allowto ')
const { addNewBook } = require('../controllers/book.controller')


router.post('/api/books',authMiddleware, allowTo('admin'),addNewBook)

module.exports=router