import express from "express";
import {createTag, 
    getAllTags, 
    updateTag, 
    deleteTag, 
    getTag} from "../controllers/tagController.js";

const router = express.Router();

router.get("/", getAllTags);
router.post("/", createTag);
router.put("/:id", updateTag)
router.delete("/:id", deleteTag)
router.get("/:id", getTag);

export default router;