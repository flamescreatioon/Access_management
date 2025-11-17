import jwt from 'jsonwebtoken';

export const authenticate = (req, res,next)=>{
    const header = req.headers.authorization;
    if(!header)return res.status(401).json({error: 'Missing token'});

    const token = header.split(' ')[1];

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token'});
    }
}

export const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
}