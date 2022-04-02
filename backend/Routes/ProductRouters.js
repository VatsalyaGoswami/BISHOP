import express from "express";

const router=express.Router();

import {getProducts,getProductById,deleteProduct, updateProduct,createProduct,createProductReview,getTopProducts} from "../controllers/productControllers.js";
import protect from "../Middlewares/authMiddleware.js";
import admin from "../Middlewares/authMiddleware.js"

router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
router.route('/vb/top').get(getTopProducts)
export default router;