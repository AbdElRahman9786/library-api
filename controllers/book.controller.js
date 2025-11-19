const multer = require("multer");
const Book = require("../models/book");


const getAllBooks=async (req,res,next)=>{
    try{
const books=await Book.find({})
res.status(200).json({"message":"books geted successfully","data":books})
    }catch(err){
        res.status(400).json({"message":"there is an error","error":err.message})
    }
}
const addNewBook=async (req,res,next)=>{
    try{
const {title,author,price,rate}=req.body;
const image=req.file;

const newBook=new Book({title,author,price,rate, ImageUrl:image.path})

await newBook.save()

res.status(201).json({"message":"book added succeffully" ,"data": newBook})
    }catch(err){
        res.status(401).json({"message":"there was an error" ,error:err.message})
    }
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

const getTopRatedBooks=async (req,res,next)=>{

    try{
 const topRatedBooks = await Book.find({ rate: { $gt: 3 } });


res.status(200).json({"message":"books geted succsffully","data":topRatedBooks})
    }catch(err){
        res.status(400).json({"message":"there is an error","error":err.message})
    }



}

module.exports={
    addNewBook,getBookById,getTopRatedBooks,getAllBooks
}