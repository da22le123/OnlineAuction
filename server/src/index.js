import express from 'express';
import auth from './routes/auth.js';
import itemsRouter from './routes/items.js';
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json());
app.use(cors());
app.use("/auth", auth);
app.use("/items", itemsRouter);
// Middleware to parse incoming JSON requests


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})