import{ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,ORDER_DETAIL_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
ORDER_PAY_FAIL,ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,
ORDER_LIST_FAIL,ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS,
ORDER_DELIVERED_FAIL,ORDER_DELIVERED_REQUEST,ORDER_DELIVERED_SUCCESS} from '../Constants/orderConstants'
import axios from 'axios';
export const createOrder =(order)=>async(dispatch,getState)=>{
    try{
dispatch({
    type:ORDER_CREATE_REQUEST
})
const userInfo=getState().userLogin.userInfo;
console.log(userInfo)
const config={
    headers:{
        'content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
    }
}
console.log(order)
 const {data}=await axios.post('/api/orders',order,config)
console.log(data)
dispatch({
    type:ORDER_CREATE_SUCCESS,
    payload:data
})

    }
    catch(error)
    {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response&&error.response.data.message?
            error.response.data.message
            :error.message
        })
    }
}

export const getOrderDetail =(id)=>async(dispatch,getState)=>{
    try{
dispatch({
    type:ORDER_DETAIL_REQUEST,
})
const userInfo=getState().userLogin.userInfo;

const config={
    headers:{
      
        Authorization:`Bearer ${userInfo.token}`
    }
}

 const {data}=await axios.get(`/api/orders/${id}`,config)
console.log(data);
dispatch(
    {
    type:ORDER_DETAIL_SUCCESS,
    payload:data
})

    }
    catch(error)
    {
        dispatch({
            type:ORDER_DETAIL_FAIL,
            payload:error.response&&error.response.data.message?
            error.response.data.message
            :error.message
        })
    }
}
export const payOrder =(id,paymentResult)=>async(dispatch,getState)=>{
    console.log("nice");
     try{
 dispatch({
     type:ORDER_PAY_REQUEST,
 })
 const userInfo=getState().userLogin.userInfo;
 
 const config={
     headers:{
        'Content-Type':'application/json',
         Authorization:`Bearer ${userInfo.token}`
     }
 }
 
  const {data}=await axios.put(`/api/orders/${id}/pay`,paymentResult,config)
 console.log(data);
 dispatch(
     {
     type:ORDER_PAY_SUCCESS,
     payload:data
 })
 
     }
     catch(error)
     {
         dispatch({
             type:ORDER_PAY_FAIL,
             payload:error.response&&error.response.data.message?
             error.response.data.message
             :error.message
         })
     }
 }
 export const listMyOrders =()=>async(dispatch,getState)=>{
     try{
 dispatch({
     type:ORDER_LIST_MY_REQUEST,
 })
 const userInfo=getState().userLogin.userInfo;
 
 const config={
     headers:{
      
         Authorization:`Bearer ${userInfo.token}`
     }
 }
  const {data}=await axios.get('/api/orders/myorders',config)
 
 dispatch(
     {
     type:ORDER_LIST_MY_SUCCESS,
     payload:data
 })
 
     }
     catch(error)
     {
         dispatch({
             type:ORDER_LIST_MY_FAIL,
             payload:error.response&&error.response.data.message?
             error.response.data.message
             :error.message
         })
     }
 }

 export const listOrders=()=>async(dispatch,getState)=>{
     try{
      dispatch({type:ORDER_LIST_REQUEST})
      const userInfo=getState().userLogin.userInfo;
 
      const config={
          headers:{
           
              Authorization:`Bearer ${userInfo.token}`
          }
      }
      const {data}=await axios.get('/api/orders',config)
      
      dispatch({type:ORDER_LIST_SUCCESS,payload:data})
      

     }
     catch(error)
     {
        dispatch({
            
            type:ORDER_LIST_FAIL,
            payload:error.response&&error.response.data.message?
            error.response.data.message
            :error.message
        })
     }
 }
 export const deliverOrder =(order)=>async(dispatch,getState)=>{
    console.log("nice");
     try{
 dispatch({
     type:ORDER_DELIVERED_REQUEST,
 })
 const userInfo=getState().userLogin.userInfo;
 
 const config={
     headers:{
         Authorization:`Bearer ${userInfo.token}`
     }
 }
 
  const {data}=await axios.put(`/api/orders/${order._id}/deliver`,{},config)
 console.log(data);
 dispatch(
     {
     type:ORDER_DELIVERED_SUCCESS,
     payload:data
 })
 
     }
     catch(error)
     {
         dispatch({
             type:ORDER_DELIVERED_FAIL,
             payload:error.response&&error.response.data.message?
             error.response.data.message
             :error.message
         })
     }
 }