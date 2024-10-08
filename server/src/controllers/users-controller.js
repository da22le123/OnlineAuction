import {getAllUsers, createUser, getUserByEmail} from '../models/user-model.js';
import {generateToken} from "../service/auth-service.js";

export function getAllUsersController(req, res) {
    const users = getAllUsers();
    res.status(200).json(users);
}

export async function createNewUser(req, res) {
    try {
        const newUser = req.body;
        const userId = await createUser(newUser);

        if (userId) {
            const token = generateToken(userId, newUser.email);

        res.status(201).json({message: 'User created successfully', id: userId, token});
        }
        else
            res.status(400).json({message: 'Something went wrong'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export function getUserByEmailController(req, res) {
    try{
        const email = req.params.email;
        const user = getUserByEmail(email);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    } catch (error) {
        res.status(404).json({ error: error.message }); //user not found
    }
}