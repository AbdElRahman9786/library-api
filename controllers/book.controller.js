const Book = require("../models/book");

const addNewBook=async (req,res,next)=>{
const {title,author,price}=req.body;
if(!title||!author||!price){
    return res.status(400).json({"message":"there is a missing values "})
}
const newBook=new Book({title,author,price})

await newBook.save()

res.status(201).json({"message":"book added succeffully" ,"data": newBook})
}

module.exports={
    addNewBook
}