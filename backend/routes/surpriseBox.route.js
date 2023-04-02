import express from "express";
import { createSurpriseBox, deleteSurpriseBox, getAllSurpriseBoxes, getSurpriseBox, updateSurpriseBox } from "../controllers/surprisebox/surpriseboxController.js";

const router = express.Router();

router.get("/", getAllSurpriseBoxes);
router.post("/", createSurpriseBox);
router.put("/:id", updateSurpriseBox)
router.delete("/:id", deleteSurpriseBox)
router.get("/:id", getSurpriseBox);

export default router;