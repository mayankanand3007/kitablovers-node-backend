import express from "express";
import {createWarehouseCityInventory, getAllWarehouseCities} from "../controllers/warehouseCityController.js"

const router = express.Router();

router.get("/", getAllWarehouseCities);
router.post("/", createWarehouseCityInventory);

export default router;