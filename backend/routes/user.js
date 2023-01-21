import express from "express";
import { likeSong } from "../controllers/auth.js";

const router = express.Router();

router.post('/likesong', likeSong);


export default router;