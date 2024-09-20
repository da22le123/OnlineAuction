import express from 'express';
const router = express.Router();

router.post("/", async (req, res) => {
    // @todo check the credentials and return an appropriate response
    // For testing purposes a dummy token is returned.
    res.json({
        "token": "dummyt0k3nv4lu3!"
    })
});

export default router;