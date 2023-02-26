import express from "express";
import {createBooksInventory, getAllBooksInventory} from "../controllers/bookInventoryController.js"

const router = express.Router();

router.get("/", getAllBooksInventory);
router.post("/", createBooksInventory);

export default router;