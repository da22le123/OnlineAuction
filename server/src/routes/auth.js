import express from 'express';
import bcrypt from "bcrypt";
import {getUserByEmail} from "../models/user-model.js";
import jwt from 'jsonwebtoken';
import {generateToken} from "../service/auth-service.js";  // Import jsonwebtoken
const router = express.Router();

//Error comparing passwords
//Bad credentials
router.post("/", async (req, res) => {
    const providedEmail = req.body.email;
    const providedPassword = req.body.password;
    let user;
    let userPassword;

    try {
        user = getUserByEmail(providedEmail);
        userPassword = user.password;

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(providedPassword, userPassword);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Bad credentials" });
        }

    } catch (error) {
        res.status(400).json({ error: "Bad credentials" });
    }

    if (user) {
        const token = generateToken(user.id, user.email);
        res.status(200).json({token});
    }



});

export default router;