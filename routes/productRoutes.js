import { createProduct } from "../controllers/productControllers.js";
import express from "express";

const router = express.Router();

router.post("/create", createProduct);

export default router;