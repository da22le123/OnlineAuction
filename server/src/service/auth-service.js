import jwt from 'jsonwebtoken';

export function generateToken(userId, userEmail) {
    const secret = process.env.JWT_SECRET;

    return jwt.sign({userId, userEmail}, secret);
}