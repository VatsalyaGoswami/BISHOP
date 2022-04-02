import React from "react";
import {Route} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {LinkContainer} from "react-router-bootstrap";
import{Container,Row,Col,Navbar,Nav, NavDropdown} from "react-bootstrap";
import { logout } from "../Actions/userActions";
import SearchBox from "./searchBox";
const Header=()=>{
const dispatch=useDispatch()
const userLogin=useSelector(state=>state.userLogin);
const userInfo=userLogin.userInfo;
console.log(userLogin);

const logoutHandler=()=>{
  window.location.reload();
  dispatch(logout());

}
    return(
        <>
      <header>
        <Navbar bg="dark" variant='dark' expand="lg">
  <Container>
    <LinkContainer to="/">
    <Navbar.Brand >MyShop</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Col ><SearchBox /></Col>
  
      <Nav className="ml-auto">
        <LinkContainer to="/cart/:_id">
        <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
        </LinkContainer>
     
       { 
          userInfo?
          (
          <NavDropdown  title={userInfo.name}>
            <LinkContainer to="/profile">
              <NavDropdown.Item>profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
          ):
          <LinkContainer to="/login">
        <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
        </LinkContainer>
          
}
{userInfo &&userInfo.isAdmin&&(
  <NavDropdown  title='Admin' id='adminmenu'>
  <LinkContainer to="/admin/userlist">
    <NavDropdown.Item>Users</NavDropdown.Item>
  </LinkContainer>
  <LinkContainer to="/admin/productlist">
    <NavDropdown.Item>Products</NavDropdown.Item>
  </LinkContainer>
  <LinkContainer to="/admin/orderlist">
    <NavDropdown.Item>Orders</NavDropdown.Item>
  </LinkContainer>
</NavDropdown>
)}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
      </header>
            </>

    )
}
export default Header;