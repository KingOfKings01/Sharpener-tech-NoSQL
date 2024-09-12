import path from 'path'

import express from 'express'

import { getIndex, getProduct, getProducts } from '../controllers/shop.js'

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.post('/create-order', shopController.postOrder); 

// router.get('/orders', shopController.getOrders);

export default router;
