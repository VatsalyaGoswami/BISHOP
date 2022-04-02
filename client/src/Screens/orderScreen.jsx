import React,{useEffect,useState} from "react";
import {Button,Row,Col,ListGroup,Image,Card} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Message from "../Components/Message";
import {PayPalButton} from "react-paypal-button-v2"
import { Link,useParams ,useNavigate} from "react-router-dom";
import { getOrderDetail, payOrder,deliverOrder } from "../Actions/orderActions";
import Loader from "../Components/loader";
import { ORDER_PAY_RESET,ORDER_DELIVERED_RESET } from "../Constants/orderConstants";
import axios from "axios";

const OrderScreen=()=>{

   const dispatch=useDispatch();
   const navigate=useNavigate();
  const{id}=useParams()

  const [sdkReady,setSdkReady]=useState(false)

   
  const  orderDetail=useSelector((state)=>state.orderDetail)
   const {Loading,orders,error}=orderDetail
   console.log(orderDetail)
 
const  orderPay=useSelector((state)=>state.orderPay)
const {loading:loadingPay}=orderPay;
const {success:successPay}=orderPay

const  orderDeliver=useSelector((state)=>state.orderDeliver)
const {loading:loadingDeliver}=orderDeliver;
const {success:successDeliver}=orderDeliver;


const  userLogin=useSelector((state)=>state.userLogin)
const {userInfo}=userLogin

   if(!Loading)
   {
  const addDecimals=(num)=>{
   return (Math.round(num*100)/100).toFixed(2)
  }

orders.itemsPrice=addDecimals(orders.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0))
   }

   useEffect(()=>{
      
       if(!userInfo)
       {
           navigate('/login')
       }
       const addPayPalScript=async()=>{
           const {data:clientId}=await axios.get('/api/config/paypal')
         const script=document.createElement("script")
         script.type='text/javascript'
         script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
         script.async=true
         script.onload=()=>{
             setSdkReady(true)
         }
         document.body.appendChild(script)
       }
   
       
       if(!orders||successPay||successDeliver)
       {   
        dispatch({
            type:ORDER_PAY_RESET
            })
        dispatch({type:ORDER_DELIVERED_RESET})
      
           dispatch(getOrderDetail(id))
       }
       else if(!orders.isPaid)
       {
           if(!window.paypal)
           {
               addPayPalScript()
           }
           else{
               setSdkReady(true)
           }
       }
      
   },[orders,dispatch,id,successDeliver,navigate,successPay])


   const successPaymentHandler=(paymentResult)=>{
console.log(paymentResult)
dispatch(payOrder(id,paymentResult))
   }

   const deliverHandler=()=>{
       dispatch(deliverOrder(orders))
   }
   return (
       Loading?(<Loader />):error?(
           <Message variant='danger'>{error}</Message>
       ):(
    
    <Row >
         <Col md={8}>
        
        <ListGroup variant='flush'>
            <ListGroup.Item>
               <h2>Shipping</h2>
              <p> <strong>Name:</strong>{orders&&orders.user.name}</p>
               <p><strong>Email:</strong>{' '}
               <a href={`mailto:${orders.user.email}`}>{orders.user.email}</a></p>
               <p>
                   <strong>Address:</strong>
                   {orders&&orders.shippingAddress.address},{orders&&orders.shippingAddress.city}{' '}
                   {orders&&orders.shippingAddress.postalCode},{' '}
                   {orders&&orders.shippingAddress.country}
               </p>
               {orders.isDelivered?<Message variant='success'>paid at {orders.DeliveredAt}</Message>:
                <Message variant='danger'>Not delivered</Message>}
               
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>PayMent Method</h2>
                <p>
                <strong>Method:</strong>
                {orders&&orders.paymentMethod}
                </p>
                {orders.isPaid?<Message variant='success'>paid on {orders.paidAt}</Message>:
                <Message variant='danger'>Not paid</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Order Items</h2>
             {
                 orders&&orders.orderItems.length===0?<Message>your cart is empty</Message>
                 :(<ListGroup variant='flush'>
                     {orders&&orders.orderItems.map((item,index)=>(
                         <ListGroup.Item key={index}>
                             <Row>
                                 <Col md={1}>
                                     <Image src={item.image} alt={item.name}
                                     fluid rounded />
                                 </Col>
                                 <Col>
                                 <Link to={`/product/${item.product}`}>
                                     {item.name}</Link>
                                 </Col>
                                 <Col md={4}>
                                     {item.qty}x${item.price}=${item.qty*item.price}
                                 </Col>
                             </Row>
                             </ListGroup.Item>
                     ))

                     }</ListGroup>)
             }
            </ListGroup.Item>
            </ListGroup>
    </Col>
    <Col md={4}>
        <Card>
            <ListGroup>
                <ListGroup.Item>
                    <h2>order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>ItemsPrice</Col>
                        <Col>${orders&&orders.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>${orders&&orders.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>${orders&&orders.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total</Col>
                        <Col>${orders&&orders.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>  
               {!orders.isPaid&&(
                   <ListGroup.Item>
                       {loadingPay&&<Loader />}
                       {!sdkReady?<Loader />:(
                           <PayPalButton amount={orders.totalPrice} onSuccess={successPaymentHandler} />
                       )}
                   </ListGroup.Item>
               )}
               {loadingDeliver&&<Loader />}
               { userInfo.isAdmin && orders.isPaid && !orders.isDelivered&&(
                   <ListGroup.Item>
                       <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark As Delivered</Button>
                   </ListGroup.Item>
               )}
            </ListGroup>
        </Card>
    </Col>
</Row>
       )

            
   )

   
}
export default OrderScreen;