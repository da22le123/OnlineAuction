import {getUserByEmail} from "../models/user-model.js";
import bcrypt from "bcrypt";
import {generateToken} from "../service/auth-service.js";

export async function postToken(req, res) {
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
            const token = generateToken(user.id, user.email, user.isAdmin);
            res.status(200).json({token});
        }
}