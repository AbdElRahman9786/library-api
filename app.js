const express=require('express')
const app=express()
const mongoose = require('mongoose');
const userRouter=require('./routers/userRouter')
const cartRouter=require('./routers/cart.Router')
const bookRouter=require('./routers/book.Router')

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
connectDB();
app.use(express.json());
app.use(userRouter)
app.use(cartRouter)
app.use(bookRouter)

app.listen(process.env.PORT,()=>{
    console.log("server is runing")
})