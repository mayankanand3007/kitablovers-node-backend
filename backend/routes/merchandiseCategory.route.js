import express from "express";
import { getAllMerchandises,
    createMerchandise,
    updateMerchandise,
    deleteMerchandise,
    getMerchandise} from "../controllers/merchandise/merchandiseController.js";

const router = express.Router();

router.get("/", getAllMerchandises);
router.post("/", createMerchandise);
router.put("/:id", updateMerchandise)
router.delete("/:id/:replace_id", deleteMerchandise)
router.get("/:id", getMerchandise);

export default router;