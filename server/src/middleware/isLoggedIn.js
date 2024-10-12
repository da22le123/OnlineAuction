import jwt from 'jsonwebtoken';

export function isLoggedIn(req, res, next) {
    let token;

    const authHeader = req.headers.authorization;

    // Normal case scenario, token is passed in the Authorization header
    if (authHeader?.startsWith('Bearer '))  {
        token = authHeader.split(' ')[1];
    }
    // The token might be passed as a query parameter when we request a stream of bids, as EventSource does not support
    // custom headers
    else if (req.query?.token) {
        // Check if token is passed as query parameter
        token = req.query.token;
    }

    if (!token) return res.sendStatus(401); // Unauthorized


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(401); // Unauthorized

        req.user = decoded;

        next();
    });
}