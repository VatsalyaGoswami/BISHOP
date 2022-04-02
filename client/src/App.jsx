
import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/Homescree";
import {Route,Routes} from"react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/cartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/shippingScreen";
import PaymentScreen from "./Screens/paymentScreen";
import PlaceOrderScreen from "./Screens/placeOrderScreen";
import OrderScreen from "./Screens/orderScreen";
import UserListScreen from "./Screens/userListScreen";
import UserEditScreen from "./Screens/userEditScreen";
import ProductListScreen from "./Screens/productListScreen";
import OrderListScreen from "./Screens/orderListScreen";
const App=()=> {
  
  return (
   <>
   <Header />
   <main className="py-3">
     <Container>
       <Routes>
       <Route path="/order/:id" element={<OrderScreen></OrderScreen>} exact />
       <Route path='/placeOrder' element={<PlaceOrderScreen></PlaceOrderScreen>} exact />
       <Route path='/payment' element={<PaymentScreen></PaymentScreen>} exact />
       <Route path='/shipping' element={<ShippingScreen></ShippingScreen>} exact />
       <Route path='/login' element={<LoginScreen></LoginScreen>} exact />
       <Route path='/register' element={<RegisterScreen></RegisterScreen>} exact />
       <Route path='/product/:_id' element={<ProductScreen></ProductScreen>} exact />
       <Route path='/profile' element={<ProfileScreen></ProfileScreen>} exact />
       <Route path='/cart/:_id' element={<CartScreen></CartScreen>} exact />
       <Route path="/admin/userlist" element={<UserListScreen></UserListScreen>}exact />
       <Route path="/admin/user/:id/edit" element={<UserEditScreen></UserEditScreen>} exact />
       <Route path="/admin/productlist" element={<ProductListScreen></ProductListScreen>}exact />
       <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen></ProductListScreen>}exact />
       <Route path="/admin/orderlist" element={<OrderListScreen></OrderListScreen>}exact />
       <Route path='/search/:keyword' element={<HomeScreen/>} exact></Route>
       <Route path='/page/:pageNumber' element={<HomeScreen/>} exact></Route>
       <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>} exact></Route>
       <Route path='/' element={<HomeScreen/>} exact></Route>
</Routes>
   </Container>
   </main>
   <Footer />
   </>
  );
}

export default App;
