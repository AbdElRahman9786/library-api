const jwt = require('jsonwebtoken'); // Don't forget to import this

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
        console.log(decoded);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authmiddleware;
