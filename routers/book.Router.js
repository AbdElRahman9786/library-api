const express=require('express')

const router=express.Router()



const bookHandler=require('../controllers/cart.controller')
const authMiddleware = require('../middleware/auth')
const allowTo = require('../middleware/allowto ')
const { addNewBook, getBookById } = require('../controllers/book.controller')


router.post('/api/books',authMiddleware, allowTo('admin'),addNewBook)
router.get('/api/books/:id',authMiddleware,allowTo('user','admin'),getBookById)

module.exports=router