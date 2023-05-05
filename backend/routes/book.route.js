import express from "express";
import {getAllBooks, updateBook, getBook} from "../controllers/books/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBook);
router.put("/:id", updateBook);

export default router;