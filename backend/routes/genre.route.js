import express from "express";
import {createGenreL1, 
    createGenreL2, 
    createGenreL3,
    getAllGenres,
    deleteGenreL1,
    deleteGenreL2,
    deleteGenreL3,
    getGenre,
    updateGenre,
    deleteGenre,
    getL1Genres,
    getL2Genres,
    getL3Genres} from "../controllers/genreController.js";

const router = express.Router();

router.get("/", getAllGenres);
router.get("/l1", getL1Genres);
router.get("/l2", getL2Genres);
router.get("/l3", getL3Genres);
router.get("/:id", getGenre);
router.post("/l1", createGenreL1);
router.post("/l2", createGenreL2);
router.post("/l3", createGenreL3);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);
// router.delete("/level1/:id", deleteGenreL1);
// router.delete("/level2/:id", deleteGenreL2);
// router.delete("/level3/:id", deleteGenreL3);

export default router;