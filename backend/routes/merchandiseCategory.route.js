import express from "express";
import {
    getAllMerchandiseCategories,
    createMerchandiseCategory,
    updateMerchandiseCategory,
    deleteMerchandiseCategory,
    getMerchandiseCategory} from "../controllers/merchandise/categoryController.js";

const router = express.Router();

router.get("/", getAllMerchandiseCategories);
router.post("/", createMerchandiseCategory);
router.put("/:id", updateMerchandiseCategory)
router.delete("/:id/:replace_id", deleteMerchandiseCategory)
router.get("/:id", getMerchandiseCategory);

export default router;