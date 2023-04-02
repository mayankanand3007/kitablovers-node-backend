import express from "express";
import {getAllBooks, updateBook} from "../controllers/books/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
// router.post("/", createBookFromISBN);
router.put("/:id", updateBook);

export default router;