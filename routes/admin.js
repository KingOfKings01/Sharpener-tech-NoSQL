import path from 'path'

import express from 'express'
import { getAddProduct, getEditProduct, postAddProduct, postDeleteProduct, postEditProduct, getProducts } from '../controllers/admin.js';

// import adminController from '../controllers/admin.js'

const router = express.Router();


router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

router.get('/products', getProducts);

router.get('/edit-product/:productId', getEditProduct);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', postDeleteProduct);      

export default router;
