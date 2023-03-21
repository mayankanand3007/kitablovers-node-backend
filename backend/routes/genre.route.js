import express from "express";
import {createGenreL1, 
    createGenreL2, 
    getAllGenres, 
    deleteGenre} from "../controllers/genreController.js";

const router = express.Router();

router.get("/", getAllGenres);
router.post("/:l1", createGenreL1);
router.post("/:l1/:l2", createGenreL2);
// router.put("/:id", updateBooksInventory)
router.delete("/:id", deleteGenre)
// router.get("/:id", getBooksInventory);

export default router;