import express from "express";
import { getBooksCrime } from "../controllers/books/bookInventoryController.js";

const router = express.Router();


router.get("/book/crime", getBooksCrime);


export default router;