const express=require('express')
const app=express()
var cors = require('cors')
const mongoose = require('mongoose');
const userRouter=require('./routers/userRouter')
const cartRouter=require('./routers/cart.Router')
const bookRouter=require('./routers/book.Router')
const multer  = require('multer')
const dotenv = require('dotenv');

dotenv.config();
async function connectDB() {
    try {
        await mongoose.connect(process.env.CONNECTIONSTRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
function fileFilter (req, file, cb) {






  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  }
else
    {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false)
  }
  

  

}
app.use(cors())
connectDB();
app.use(express.json());
app.use(multer({storage:storage,fileFilter}).single('image'))
app.use(userRouter)
app.use(cartRouter)
app.use(bookRouter)



app.listen(process.env.PORT,()=>{
    console.log("server is runing")
})