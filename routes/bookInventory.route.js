import express from "express";
import {createBooksInventory, 
    getAllBooksInventory,  
    getBooksInventory,
    addPricingBooksInventory,
    addInventoryBooksInventory,
    updateMRPBooksInventory,
    updatePricingBooksInventory,
    updateInventoryBooksInventory,
    deletePricingBooksInventory,
    deleteInventoryBooksInventory} from "../controllers/books/bookInventoryController.js";

const router = express.Router();

router.get("/", getAllBooksInventory);
router.post("/", createBooksInventory);
router.post("/pricing/:id", addPricingBooksInventory);
router.post("/inventory/:id", addInventoryBooksInventory);
router.put("/mrp/:id/", updateMRPBooksInventory);
router.put("/pricing/:id/:pricingid", updatePricingBooksInventory);
router.put("/inventory/:id/:inventoryid", updateInventoryBooksInventory);
router.delete("/pricing/:id/:pricingid", deletePricingBooksInventory);
router.delete("/inventory/:id/:inventoryid", deleteInventoryBooksInventory);
router.get("/:id", getBooksInventory);

export default router;