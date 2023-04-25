import express from "express";
import {
    createBookCondition, 
    getAllBookConditions, 
    updateBookCondition, 
    deleteBookCondition, 
    getBookCondition} from "../controllers/books/bookConditionController.js";

const router = express.Router();

router.get("/", getAllBookConditions);
router.post("/", createBookCondition);
router.put("/:id", updateBookCondition)
router.delete("/:id/:replace_id", deleteBookCondition)
router.get("/:id", getBookCondition);

export default router;