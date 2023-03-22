import express from "express";
import {createGenreL1, 
    createGenreL2, 
    createGenreL3,
    getAllGenres, 
    getGenreL1,
    getGenreL2,
    getGenreL3,
    deleteGenreL1,
    deleteGenreL2,
    deleteGenreL3} from "../controllers/genreController.js";

const router = express.Router();

router.get("/", getAllGenres);
router.post("/level1/:l1", createGenreL1);
router.post("/level2/:l1/:l2", createGenreL2);
router.post("/level3/:l2/:l3", createGenreL3);
router.put("/level1/:l1/:l1n");
router.put("/level2/:l2/:l2n");
router.put("/level3/:l2/:l2n");
router.delete("/level1/:id", deleteGenreL1);
router.delete("/level2/:id", deleteGenreL2);
router.delete("/level3/:id", deleteGenreL3);
router.get("/level1/:id",getGenreL1);
router.get("/level2/:id",getGenreL2);
router.get("/level3/:id",getGenreL3);

export default router;