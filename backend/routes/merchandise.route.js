import express from "express";
import { createMerchandise, deleteMerchandise, getAllMerchandises, getMerchandise, updateMerchandise } from "../controllers/merchandise/merchandiseController.js";

const router = express.Router();

router.get("/", getAllMerchandises);
router.post("/", createMerchandise);
router.put("/:id", updateMerchandise)
router.delete("/:id", deleteMerchandise)
router.get("/:id", getMerchandise);

export default router;