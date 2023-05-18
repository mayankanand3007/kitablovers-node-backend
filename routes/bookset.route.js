import express from "express";
import { createBookset, deleteBookset, getAllBooksets, getBookset, updateBookset } from "../controllers/booksets/booksetController.js";

const router = express.Router();

router.get("/", getAllBooksets);
router.post("/", createBookset);
router.put("/:id", updateBookset)
router.delete("/:id", deleteBookset)
router.get("/:id", getBookset);

export default router;