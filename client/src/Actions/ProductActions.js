import { PRODUCT_LIST_FAIL,PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REAQUEST,
  PRODUCT_DETAIL_REAQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REAQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REAQUEST,

  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REAQUEST,
 
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_REAQUEST
} from "../Constants/ProductConstants"
 import axios from "axios";
 export const ListProducts=(keyword='',pageNumber='')=> async(dispatch)=>{
  try{
   dispatch({type:PRODUCT_LIST_REAQUEST})

   const {data}=await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber} `)
   dispatch({
       type:PRODUCT_LIST_SUCCESS,
       payload:data
  })
}
  catch(error){
    dispatch({
        type:PRODUCT_LIST_FAIL,
        payload:error.response&&error.response.data.message?
        error.response.data.message
        :error.message
    })
  }
 }
 export const ListProductDetails=(id)=> async(dispatch)=>{
  try{
   dispatch({type:PRODUCT_DETAIL_REAQUEST})

   const {data}=await axios.get(`/api/products/${id}`);
   dispatch({
       type:PRODUCT_DETAIL_SUCCESS,
       payload:data
  })
}
  catch(error){
    dispatch({
        type:PRODUCT_DETAIL_FAIL,
        payload:error.response&&error.response.data.message?
        error.response.data.message
        :error.message
    })
  }
 }
 export const deleteProduct =(id)=>async(dispatch,getState)=>{
  try{
dispatch({
  type:PRODUCT_DELETE_REAQUEST
})
const userInfo=getState().userLogin.userInfo;

const config={
  headers:{
   
      Authorization:`Bearer ${userInfo.token}`
  }
}
await axios.delete(`/api/products/${id}`,config)

dispatch(
  {
  type:PRODUCT_DELETE_SUCCESS,

})

  }
  catch(error)
  {
      dispatch({
          type:PRODUCT_DELETE_FAIL,
          payload:error.response&&error.response.data.message?
          error.response.data.message
          :error.message
      })
  }
}

export const createProduct =()=>async(dispatch,getState)=>{
  try{
dispatch({
  type:PRODUCT_CREATE_REAQUEST
})
const userInfo=getState().userLogin.userInfo;

const config={
  headers:{
   
      Authorization:`Bearer ${userInfo.token}`
  }
}
const {data}=await axios.post(`/api/products`,{},config)

dispatch(
  {
  type:PRODUCT_CREATE_SUCCESS,
   payload:data
})

  }
  catch(error)
  {
      dispatch({
          type:PRODUCT_CREATE_FAIL,
          payload:error.response&&error.response.data.message?
          error.response.data.message
          :error.message
      })
  }
}

export const createProductReview =(productId,review)=>async(dispatch,getState)=>{
  console.log(productId)
  try{
dispatch({
  type:PRODUCT_CREATE_REVIEW_REAQUEST
})
const userInfo=getState().userLogin.userInfo;

const config={
  headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${userInfo.token}`
  }
}
await axios.post(`/api/products/${productId}/reviews`,review,config)

dispatch(
  {
  type:PRODUCT_CREATE_REVIEW_SUCCESS,
   
})

  }
  catch(error)
  {
      dispatch({
          type:PRODUCT_CREATE_REVIEW_FAIL,
          payload:error.response&&error.response.data.message?
          error.response.data.message
          :error.message
      })
  }
}
export const listTopProducts=()=> async(dispatch)=>{
  try{
   dispatch({type:PRODUCT_TOP_REAQUEST})

   const {data}=await axios.get("/api/products/vb/top"
   )
   dispatch({
       type:PRODUCT_TOP_SUCCESS,
       payload:data
  })
}
  catch(error){
    dispatch({
        type:PRODUCT_TOP_FAIL,
        payload:error.response&&error.response.data.message?
        error.response.data.message
        :error.message
    })
  }
 }