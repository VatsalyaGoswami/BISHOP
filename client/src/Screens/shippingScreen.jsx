import React from "react";
import {useState,useEffect} from "react";
import {Form,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import{useLocation,useSearchParams,Link,useNavigate} from "react-router-dom";
import { login } from "../Actions/userActions";
import {FormContainer} from '../Components/FormContainer';
import { saveShippingAddress } from "../Actions/CartActions";
import {CheckoutSteps} from "../Components/checkoutSteps"
const ShippingScreen=()=>{
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const [address,setAddress]=useState(shippingAddress.address);
    const [city,setCity]=useState(shippingAddress.city);
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode);
    const [country,setCountry]=useState(shippingAddress.country);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment');
    }
    return(
     
       <FormContainer>
           <Link to={'/'}>Go Back</Link>
           <CheckoutSteps step1 step2 />
           <h1>Shipping</h1>
           <Form onSubmit={submitHandler}>
           <Form.Group controlId="address">
        <Form.Label> Address</Form.Label>
        <Form.Control 
        type='text'
         placeholder='Enter address'
          value={address}
          required
        onChange={(e)=>setAddress(e.target.value)}
        >
        </Form.Control>

         </Form.Group>
         <Form.Group controlId="city">
        <Form.Label> City</Form.Label>
        <Form.Control 
        type='text'
         placeholder='Enter City'
          value={city}
        onChange={(e)=>setCity(e.target.value)}
        >
        </Form.Control>
        </Form.Group>
     

<Form.Group controlId="country">
<Form.Label> Country</Form.Label>
<Form.Control 
type='text'
placeholder='Enter Country'
 value={country}
onChange={(e)=>setCountry(e.target.value)}
>
</Form.Control>
</Form.Group>
<Form.Group controlId="postalCode">
<Form.Label> Postal Code</Form.Label>
<Form.Control 
type='text'
placeholder='Enter PostalCode'
 value={postalCode}
onChange={(e)=>setPostalCode(e.target.value)}
>
</Form.Control>
</Form.Group>

<Button type='submit' variant='primary' >Continue</Button>
 
        
           </Form>
       </FormContainer>
        
    )

}
export default ShippingScreen;