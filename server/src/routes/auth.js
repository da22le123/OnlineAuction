import express from 'express';
import { postToken } from '../controllers/auth-controller.js';

const router = express.Router();


router.post("/", postToken);


export default router;