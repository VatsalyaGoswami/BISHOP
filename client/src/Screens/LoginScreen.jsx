import React,{useState,useEffect} from "react";
import {Form,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import{useLocation,useSearchParams,Link,useNavigate} from "react-router-dom";
import { login } from "../Actions/userActions";
import {FormContainer} from '../Components/FormContainer';
import Loader from "../Components/loader";

  const LoginScreen=()=>{
    const queryParams=new URLSearchParams(window.location.search);

const shipping=queryParams.get("shipping");//getting query params from url
   const [email,setEmail]=useState('');

    const[password,setPassword]=useState('');
  const dispatch=useDispatch();
  const userLogin=useSelector((state)=>state.userLogin);

  const {loading,error,userInfo}=userLogin;
   const navigate=useNavigate();
  
   useEffect(()=>{
  
     if(userInfo)
     {console.log(shipping)
       if(shipping)
       {console.log(shipping)
     navigate("/?shipping=true")
       }
       else{
         navigate("/");
       }
     }
    
  
   },[navigate])
   
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }
    
    return( 
        <>
         <FormContainer>
        <h1> Sign In</h1>
        {
          error&&<Button variant="danger" disabled>Invalid details</Button>
        }
        {loading&&<Loader />}
        <Form onSubmit={submitHandler}>
         <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control 
        type='email'
         placeholder='Enter email'
          value={email}
        onChange={(e)=>setEmail(e.target.value)}
        >
        </Form.Control>
         </Form.Group>
         <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type='password'
         placeholder='Enter email'
          value={password}
        onChange={(e)=>setPassword(e.target.value)}
        >
        </Form.Control>
         </Form.Group>
      <Button type='submit' varient='primary' className="my-4">
       Sign In
      </Button>
        </Form>
        New user?
        <Row>
          <Col>
          <Link to="/register">Register</Link>
          </Col>
        </Row>
        
       </FormContainer>

    </>
    )

}
export  default LoginScreen;
