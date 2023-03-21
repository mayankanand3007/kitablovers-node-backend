import express from "express";
import {createBookFromISBN} from "../controllers/bookController.js";

const router = express.Router();

// router.get("/", getAllBookConditions);
router.post("/", createBookFromISBN);
// router.put("/:id", updateBookCondition)
// router.delete("/:id", deleteBookCondition)
// router.get("/:id", getBookCondition);

export default router;