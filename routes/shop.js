import path from "path";

import express from "express";

import {
  getCart,
  getIndex,
  getProduct,
  getProducts,
  postCart,
  postCartDeleteProduct,
} from "../controllers/shop.js";

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:productId", getProduct);

router.get("/cart", getCart);

router.post("/cart", postCart);

router.post('/cart-delete-item', postCartDeleteProduct);

// router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);

export default router;
