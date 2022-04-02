import{createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { productTopRatedReducer,ProductListReducer,productReviewCreateReducer,ProductDetailReducer,ProductDeleteReducer,ProductCreateReducer} from "./Reducers/ProductsReducers";
import { cartReducer } from "./Reducers/CartReducer";
import {userUpdateReducer, userDeleteReducer,userListReducer,userLoginReducer,userRegisterReducer ,userDetailsReducer,userUpdateProfileReducer} from "./Reducers/userReducer";
import { orderListReducer,orderCreateReducer ,orderDetailReducer,orderPayReducer
,orderMyListReducer,orderDeliverReducer} from "./Reducers/orderReducers";
const reducer=combineReducers({
    productList:ProductListReducer,
    productDetails:ProductDetailReducer,
    productDelete:ProductDeleteReducer,
    productCreate:ProductCreateReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetail:orderDetailReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderMyList:orderMyListReducer,
    orderList:orderListReducer
  

})
const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
const initialState={
    
   cart:{cartItems:cartItemsFromStorage,
         shippingAddress:shippingAddressFromStorage},
   userLogin:{userInfo:userInfoFromStorage}
}

const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;