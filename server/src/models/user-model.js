import {generateNewId} from "../service/users-service.js";
import {validateUser} from "../service/users-service.js"
import bcrypt from "bcrypt";


export let users = [
    {
        id: 1,
        email: "admin@gmail.com",
        password: "$2b$10$yI6QNTcdL1A2ftjX4g2hDegrhbyaN80FA1ur9Mf9jqaW.FPE8tQC6",
        isAdmin: true
    }
];

export function getAllUsers() {
    return [...users];
}

export function findUserById(id) {
    return users.find(user => user.id === id);
}

//throws following errors:
// - "Missing required field: email for User || password for User || isAdmin for User"
// - "Invalid email address"
// - "Password must be a string with at least 8 characters"
// - "isAdmin must be a boolean value"
// - "Hashing err"
export async function createUser(user) {
    const userId = generateNewId();

    let userObj = {};
    console.log('Received user:', user);

    const userPassword = user.password;
    let hashedPassword;

    hashedPassword = await bcrypt.hash(userPassword, 10);

    userObj = {
        id: userId,
        email: user.email,
        password: hashedPassword,
        isAdmin: user.isAdmin
    }
    console.log("Hashpassw", hashedPassword);
    validateUser(userObj);
    users.push(userObj);

    return userId;
}

export function getUserByEmail(email) {
    let user = users.find(user => user.email === email);

    console.log("getUserByEmail(): ", user)

    if (user === null || user === undefined) {
        throw new Error("User not found");
    }

    return users.find(user => user.email === email);
}



