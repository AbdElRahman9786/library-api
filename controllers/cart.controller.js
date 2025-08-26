const Cart = require("../models/cart");

const getcartdata= async (req, res) => {
    try {
        const userId = req.user.id; 
        console.log('User ID:', userId); 
        const cartItems = await Cart.find({ userId }); 

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addbooktocart=async (req,res,next)=>{
 const userId = req.user.id; 
  const  quantity = 1  
 const { bookId } = req.body;
 let cart = await Cart.findOne({ userId });

  if (!cart) {
    
    cart = new Cart({
      userId: userId,
      items: [{ book: bookId, quantity }]
    });
  } else {
   
    const itemIndex = cart.items.findIndex(item => item.book.equals(bookId));

    if (itemIndex > -1) {
      
      cart.items[itemIndex].quantity += quantity;
    } else {
      
      cart.items.push({ book: bookId, quantity });
    }
  }


  await cart.save();

    res.status(201).json({ message: 'Book added to cart successfully', cart });
}

const deltetitemfromcart = async (req, res, next) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(400).json({ message: "Cart not found" });
  }

 
  const filteredItems = cart.items.filter(item => !item.book.equals(bookId));

 
  cart.items = filteredItems;

  
  await cart.save();

  res.status(200).json({"message":"Item removed from cart successfully", cart });
};


module.exports = {
    getcartdata ,
    addbooktocart,
    deltetitemfromcart
};