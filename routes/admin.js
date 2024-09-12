import path from 'path'

import express from 'express'
import { getAddProduct, getEditProduct, postAddProduct, postDeleteProduct, postEditProduct, getProducts } from '../controllers/admin.js';

// import adminController from '../controllers/admin.js'

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', postDeleteProduct);      

export default router;
