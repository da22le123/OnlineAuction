import jwt from 'jsonwebtoken';

export function isLoggedIn(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized

    const token = authHeader.split(' ')[1];


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(401); // Unauthorized

        next();
    });
}