import express from 'express';
import auth from './routes/auth.js';
import itemsRouter from './routes/items.js';
import usersRouter from './routes/users.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/auth", auth);
app.use("/items", itemsRouter);
app.use("/users", usersRouter);

// Middleware to parse incoming JSON requests


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});