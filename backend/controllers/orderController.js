import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js"
import Order from "../models/orderModel.js"
//@des  create new order
//@route POST /api/orders
//@access private

const addOrderItems =AsyncHandler(async(req,res)=>{
    console.log(req.body);
   const {
       orderItems,
       shippingAddress,
       paymentMethod,
       itemsPrice,
       taxPrice,
       shippingPrice,
       totalPrice,
   }=req.body


   if(orderItems && orderItems.length===0)
   {
       res.status(400)
       throw new Error('No order items')
   }
   else{
       const order=new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
       })
       const createdOrder=await order.save()

       res.status(201).json(createdOrder)
   }
})
//@des  get order by id
//@route POST /api/orders/:id
//@access private

const getOrderById =AsyncHandler(async(req,res)=>{
    const id=req.params.id;
   const order =await  Order.findById(id).populate('user', 'name email')
   if(order)
   {
       res.json(order)
   }
   else{
       res.status(404)
       throw new Error('Order not found')
   }
       
})
//@des  update order to paid
//@route GET /api/orders/myorders
//@access private

const updateOrderToPaid =AsyncHandler(async(req,res)=>{
    const id=req.params.id;
   const order =await  Order.findById(id)
   if(order)
   {
      order.isPaid=true
      order.paidAt=Date.now()
      order.paymentResult={
          id:req.body.id,
          status:req.body.status,
          update_time:req.body.update_time,
          email_address:req.body.payer.email_address
      }
      const updatedOrder=await order.save()

      res.json(updatedOrder)
   }
   else{
       res.status(404)
       throw new Error('Order not found')
   }
       
})
//@des  Get logged in user orders
//@route GET /api/orders/myorders
//@access private

const getMyOrders =AsyncHandler(async(req,res)=>{
        const orders=await Order.find({user:req.user._id}) 
        
        res.json(orders)
})

//@des  Get all orders
//@route GET /api/orders/
//@access private/Admin

const getOrders  =AsyncHandler(async(req,res)=>{
    const orders=await Order.find({}).populate('user','id name') 
 
    res.json(orders)
})


//@des  update order to paid
//@route GET /api/orders/myorders
//@access private

const updateOrderToDelivered =AsyncHandler(async(req,res)=>{
    const id=req.params.id;
   const order =await  Order.findById(id)
   if(order)
   {
      order.isDelivered=true
      order.deliveredAt=Date.now();
      const updatedOrder=await order.save()

      res.json(updatedOrder)
   }
   else{
       res.status(404)
       throw new Error('Order not found')
   }
       
})
export {updateOrderToDelivered,getOrders,addOrderItems,getOrderById,updateOrderToPaid,getMyOrders};