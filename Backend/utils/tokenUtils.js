// utils/tokenUtils.js
import jwt from 'jsonwebtoken';

export const generateToken = (userId, isAdmin = false) => {
    return jwt.sign(
        { 
            userId,
            isAdmin 
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
};