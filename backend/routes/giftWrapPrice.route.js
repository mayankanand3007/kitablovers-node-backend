import express from "express";
import {getGiftWrap, updateGiftWrapPrices} from "../controllers/surprisebox/giftWrapPriceController.js";

const router = express.Router();

router.get("/", getGiftWrap);
router.post("/", updateGiftWrapPrices);

export default router;