import express from "express";
import {createBookCondition, getAllBookConditions} from "../controllers/bookConditionController.js"

const router = express.Router();

router.get("/", getAllBookConditions);
router.post("/", createBookCondition);

export default router;