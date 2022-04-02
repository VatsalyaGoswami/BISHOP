
import { PRODUCT_LIST_FAIL,PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REAQUEST,
    PRODUCT_DETAIL_REAQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REAQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REAQUEST,PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_RESET
    ,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REAQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REAQUEST,
    PRODUCT_TOP_SUCCESS,
 } from "../Constants/ProductConstants"
export const ProductListReducer=(state={products:[]},action)=>{
    switch(action.type){
      case PRODUCT_LIST_REAQUEST:
          return {loading:true,products:[]}
          case PRODUCT_LIST_SUCCESS:
              return {loading:false,products:action.payload.products,
                pages:action.payload.pages,page:action.payload.page}
              case PRODUCT_LIST_FAIL:
              return{loading:false,error:action.payload}
              default:
                  return state
    }
}
export const ProductDetailReducer=(state={product:{reviews:[]}},action)=>{
    switch(action.type){
      case PRODUCT_DETAIL_REAQUEST:
          return {loading:true,...state}
          case PRODUCT_DETAIL_SUCCESS:
              return {loading:false,product:action.payload}
              case PRODUCT_DETAIL_FAIL:
              return{loading:false,error:action.payload}
              default:
                  return state
    }
}

export const ProductDeleteReducer=(state={},action)=>{
    switch(action.type){
      case PRODUCT_DELETE_REAQUEST:
          return {loading:true}
          case PRODUCT_DELETE_SUCCESS:
              return {loading:false,success:true}
              case PRODUCT_DELETE_FAIL:
              return{loading:false,error:action.payload}
              default:
                  return state
    }
}

export const ProductCreateReducer=(state={},action)=>{
    switch(action.type){
      case PRODUCT_CREATE_REAQUEST:
          return {loading:true}
          case PRODUCT_CREATE_SUCCESS:
              return {loading:false,success:true,product:action.payload}
              case PRODUCT_CREATE_FAIL:
              return{loading:false,error:action.payload}
              case PRODUCT_CREATE_RESET:
                  return {}
              default:
                  return state
    }
}
export const productReviewCreateReducer=(state={},action)=>{
    console.log(action.type)
    switch(action.type){
      case PRODUCT_CREATE_REVIEW_REAQUEST:
          return {loading:true}
          case PRODUCT_CREATE_REVIEW_SUCCESS:
              return {loading:false,success:true}
              case PRODUCT_CREATE_REVIEW_FAIL:
              return{loading:false,error:action.payload}
              case PRODUCT_CREATE_REVIEW_RESET:
                  return {}
              default:
                  return state
    }
}

export const productTopRatedReducer=(state={products:[]},action)=>{
    switch(action.type){
      case PRODUCT_TOP_REAQUEST:
          return {loading:true,products:[]}
          case PRODUCT_TOP_SUCCESS:
              return {loading:false,products:action.payload}
              case PRODUCT_TOP_FAIL:
              return{loading:false,error:action.payload}
              default:
                  return state
    }
}