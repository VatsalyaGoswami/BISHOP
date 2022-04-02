import React,{useEffect} from "react";
import {Button,Row,Col,ListGroup,Image,Card} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import { CheckoutSteps } from "../Components/checkoutSteps";
import Message from "../Components/Message";
import{Link,useNavigate} from"react-router-dom"
import { createOrder } from "../Actions/orderActions";
const PlaceOrderScreen=()=>{
    const navigate=useNavigate();
   const dispatch=useDispatch();
    const cart=useSelector((state)=>state.cart);
    
    const addDecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }
    //calculate prices
    cart.itemsPrice=addDecimals(cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0))
    
    cart.shippingprice=addDecimals(cart.itemsPrice>100?0:100)
    cart.taxprice=addDecimals(Number((0.15*cart.itemsPrice).toFixed(2)))
    cart.totalprice=(Number(cart.itemsPrice)+Number(cart.shippingprice)+Number(cart.taxprice)).toFixed(2)
   
    const orderCreate=useSelector(state=>state.orderCreate)
     const{loading,success,order}=orderCreate
     console.log(orderCreate)
    useEffect(()=>{
      if(success)
      {
        navigate(`/order/${orderCreate.order._id}`)
      }
    },[navigate,success,orderCreate])

    const placeOrderHandler=()=>{
       const Order={
        orderItems:cart.cartItems,
        shippingAddress:cart.shippingAddress,
        paymentMethod:cart.paymentMethod,
        itemsPrice:cart.itemsPrice,
        shippingPrice: cart.shippingprice,
         taxPrice:cart.taxprice,
         totalPrice:cart.totalprice

       }
  
       dispatch(createOrder(Order))
     
    if(!orderCreate.loading)
   {  
     navigate(`/order/${orderCreate.order._id}`)
   }
      
      
    }

    return(
       <>
  <CheckoutSteps step1 step2 step3 step4 />
           
       <Row>
       
           <Col md={8}>
               
               <ListGroup variant='flush'>
                   <ListGroup.Item>
                      <h2>Shipping</h2>
                      <p>
                          <strong>Address:</strong>
                          {cart.shippingAddress.address},{cart.shippingAddress.city}{' '}
                          {cart.shippingAddress.postalCode},{' '}
                          {cart.shippingAddress.country}
                      </p>
                      
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <h2>PayMent Method</h2>
                       <strong>Method:</strong>
                       {cart.paymentMethod}
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <h2>Order Items</h2>
                    {
                        cart.cartItems.length===0?<Message>your cart is empty</Message>
                        :(<ListGroup variant='flush'>
                            {cart.cartItems.map((item,index)=>(
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
                               <Col>Items</Col>
                               <Col>${cart.itemsPrice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Shipping</Col>
                               <Col>${cart.shippingprice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Tax</Col>
                               <Col>${cart.taxprice}</Col>
                           </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Row>
                               <Col>Total</Col>
                               <Col>${cart.totalprice}</Col>
                           </Row>
                       </ListGroup.Item>  
                       <ListGroup.Item>
                           <Button type='button'
                            className='btn-block' 
                           disabled={cart.cartItems===0}
                            onClick={placeOrderHandler}>Place Order</Button>
                       </ListGroup.Item>
                   </ListGroup>
               </Card>
           </Col>
       </Row>
       
       </>
    )
}
export default PlaceOrderScreen;