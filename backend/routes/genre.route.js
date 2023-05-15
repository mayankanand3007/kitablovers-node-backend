import express from "express";
import {createGenreL1, 
    createGenreL2, 
    createGenreL3,
    getAllGenres,
    getGenre,
    updateGenre,
    deleteGenre,
    getL1Genres,
    getL3Genres,
    getL1L2Genres,
    getReplaceGenres,
    getReplaceGenresL1,
    getReplaceGenresL2,
    getReplaceGenresL3} from "../controllers/books/genreController.js";

const router = express.Router();

router.get("/", getAllGenres);
router.get("/l1", getL1Genres);
router.get("/l2", getL1L2Genres);
router.get("/l3/:l1id", getL3Genres);
router.get("/:id", getGenre);
// router.get("/replace/l1/:id", getReplaceGenresL1);
// router.get("/replace/l2/:id", getReplaceGenresL2);
// router.get("/replace/l3/:id", getReplaceGenresL3);
router.get("/replace/:id", getReplaceGenres);
router.post("/l1", createGenreL1);
router.post("/l2", createGenreL2);
router.post("/l3", createGenreL3);
router.put("/:id", updateGenre);
router.delete("/:id/:replace_id", deleteGenre);

export default router;