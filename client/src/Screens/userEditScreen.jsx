import React,{useState,useEffect} from "react";
import {Form,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import{useLocation,useSearchParams,Link,useNavigate,useParams} from "react-router-dom";
import { getUserDetails,updateUser } from "../Actions/userActions";
 import { USER_UPDATE_RESET } from "../Constants/userConstants";
import {FormContainer} from '../Components/FormContainer';
import Loader from "../Components/loader";
import Message from "../Components/Message";
  const UserEditScreen=()=>{

    const {id}=useParams()
    const [name,setName]=useState('');
   const [email,setEmail]=useState('');
    const[isAdmin,setIsAdmin]=useState(false);
    
  
  const dispatch=useDispatch();

  const userDetails=useSelector((state)=>state.userDetails);
  const {loading,error,user}=userDetails;

  const userUpdate=useSelector((state)=>state.userUpdate);
  const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=userUpdate;

   const navigate=useNavigate();
   useEffect(()=>{
       if(successUpdate)
       {
           dispatch({type:USER_UPDATE_RESET})
           navigate('/admin/userlist')
       }
       else{
       
   if(!user.name||user._id!==id)
   {
       dispatch(getUserDetails(id))
   }
   else{
       setName(user.name)
       setEmail(user.email)
       setIsAdmin(user.isAdmin)
   }}}
 ,[user,dispatch,id,successUpdate])  
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(updateUser({_id:id,name,email,isAdmin}))
       
    }
    
    return( 
        <>
        <Link to='/admin/userlist' className="btn btn-light my-3">Go Back</Link>
         <FormContainer>
        <h1> Edit user</h1>
        {loadingUpdate&&<Loader/>}
        {
            errorUpdate&&<Message variant='danger'>{errorUpdate}</Message>
        }
        {loading?<Loader />:error?<Message variant='danger'>{error}</Message>:(
         <Form onSubmit={submitHandler}>
         <Form.Group controlId="name">
        <Form.Label> Name</Form.Label>
        <Form.Control 
        type='name'
         placeholder='Enter name'
          value={name}
        onChange={(e)=>setName(e.target.value)}
        >
        </Form.Control>
         </Form.Group>
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
        <Form.Group controlId="isadmin">
        <Form.Check
        type='checkbox'
         label="Is Admin"
     
          checked={isAdmin}
        onChange={(e)=>setIsAdmin(e.target.checked)}
        >
        </Form.Check>
        </Form.Group>
      <Button type='submit' varient='primary' className="my-4">
       Update
      </Button>
        </Form> )}  
       </FormContainer>
    </>
    )

}
export  default UserEditScreen;
