const User = require('../models/user');
const bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');

const getAllUsers=async (req, res) => {
    const { limit } = req.query;
    const skip = req.query.skip ;
    try {
        const users = await User.find().limit(limit).skip(skip);
        res.status(200).json({"status": "success", "data": {users}});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addUser=async (req, res) => {
    const { name, email, password,role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user =await new User({ name, email, password: hashedPassword,role });
        await user.save();
        var newtoken = jwt.sign({ email, role, id:user._id }, process.env.JWTSECRET,{expiresIn:'1h'});
        res.status(201).json({"message":"user created successfully","token":newtoken});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const loginUser=async (req, res) => {
    const { email, password } = req.body;
    const existeduser=await User.findOne({email:email});

    if(!existeduser){ 
     return   res.status(404).json({"message":"user not found"})
    }
       if(!email|| !password){
        return res.status(404).json({"message":"faild is not correct"})
    }
    const isMatch = await bcrypt.compare(password, existeduser.password);
    if (!isMatch) {
      return  res.status(400).json({"message":"invalid email or password"})
    }

    var newtoken = jwt.sign({ email,role:existeduser.role,id:existeduser._id }, process.env.JWTSECRET,{expiresIn:'3h'});


    res.status(200).json({"message":"loged in succfully","token":newtoken})

}


module.exports={
    getAllUsers,
    addUser,
    loginUser
}

