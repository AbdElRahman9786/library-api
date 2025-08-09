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


const getBookById=async (req,res,next)=>{
const {id}=req.params

if(!id){
    return res.status(400).json({"message":"there is no provided id"})
}
try{
    let book= await Book.find({_id:id})
    if(!book){
        res.status(400).json({"message":"there is no book with same id"})
    }
    res.status(200).json({"message":"book finded successfully","data":book})

}catch(err){
res.status(400).json({"message":"there is an error","error":err.message})
}

}

module.exports={
    addNewBook,getBookById
}