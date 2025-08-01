module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        const role = req.user.role;
        console.log(role);
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden - You do not have permission to access this resource' });
        }
        next();
    };
};
