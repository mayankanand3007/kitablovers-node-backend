import express from "express";
import {createBooksInventory, 
    getAllBooksInventory, 
    updateBooksInventory, 
    deleteBooksInventory, 
    getBooksInventory,
    addPricingBooksInventory,
    addInventoryBooksInventory,
    updateMRPBooksInventory} from "../controllers/books/bookInventoryController.js";

const router = express.Router();

router.get("/", getAllBooksInventory);
router.post("/", createBooksInventory);
router.post("/pricing", addPricingBooksInventory);
router.post("/inventory", addInventoryBooksInventory);
router.put("/mrp/:id/", updateMRPBooksInventory);
router.put("/pricing/:id/:pricingid", updateBooksInventory);
router.put("/inventory/:id/:inventoryid", deleteBooksInventory)
router.get("/:id", getBooksInventory);

export default router;