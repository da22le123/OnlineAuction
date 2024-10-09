import jwt from 'jsonwebtoken';

export function isAdmin(req, res, next) {
    if (!req.body.isAdmin) {
        return res.sendStatus(403); // Forbidden
    }
    next();
}