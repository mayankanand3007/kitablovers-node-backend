import express from "express";
import {createWarehouseCityInventory, 
    getAllWarehouseCities, 
    updateWarehouseCity, 
    deleteWarehouseCity, 
    getWarehouseCity} from "../controllers/warehouseCityController.js";

const router = express.Router();

router.get("/", getAllWarehouseCities);
router.post("/", createWarehouseCityInventory);
router.put("/:id", updateWarehouseCity)
router.delete("/:id", deleteWarehouseCity)
router.get("/:id", getWarehouseCity);

export default router;