import jwt from 'jsonwebtoken';

export function generateToken(userId, userEmail, isAdmin) {
    const secret = process.env.JWT_SECRET;

    return jwt.sign({userId, userEmail, isAdmin}, secret);
}