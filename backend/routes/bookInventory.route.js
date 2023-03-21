import express from "express";
import {createBooksInventory, 
    getAllBooksInventory, 
    updateBooksInventory, 
    deleteBooksInventory, 
    getBooksInventory} from "../controllers/bookInventoryController.js";

const router = express.Router();

router.get("/", getAllBooksInventory);
router.post("/", createBooksInventory);
router.put("/:id", updateBooksInventory)
router.delete("/:id", deleteBooksInventory)
router.get("/:id", getBooksInventory);

export default router;