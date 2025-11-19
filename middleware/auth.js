const jwt = require('jsonwebtoken'); 

const authmiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']|| req.headers['Authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized user - no token provided' });
    }

    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized user - malformed token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authmiddleware;
