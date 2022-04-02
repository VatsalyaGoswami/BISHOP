import express from "express";
import { addOrderItems } from "../controllers/orderController.js";
import protect from "../Middlewares/authMiddleware.js"
import { getOrderById ,updateOrderToPaid
,getMyOrders,getOrders,
updateOrderToDelivered} from "../controllers/orderController.js";
import admin from "../Middlewares/authMiddleware.js" 
const router=express.Router();

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);

export default router;