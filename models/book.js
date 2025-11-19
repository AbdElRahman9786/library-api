const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  rate:{
    type:Number,
    required:true,
    max:5,
    min:1
  }
  
 
}); 

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
