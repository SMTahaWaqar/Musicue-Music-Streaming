import express from "express";
import { customPlaylist, getCustomPlaylist, getLikedSongs, likeSong } from "../controllers/auth.js";

const router = express.Router();

router.post('/likesong', likeSong);
router.post('/addtoplaylist', customPlaylist);
router.post('/getlikedsongs', getLikedSongs);
router.post('/getcustomplaylist', getCustomPlaylist);


export default router;