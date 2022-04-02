import React,{useEffect} from "react";
import{Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import{useNavigate,useParams} from "react-router-dom"
import Loader from "../Components/loader";
import Message from "../Components/Message";
import Product from "../Components/Product";
import Paginate from "../Components/Paginate";
import { ListProducts } from "../Actions/ProductActions";
import ProductCarousel from "../Components/productCarousel";
const HomeScreen=()=>{
    const {keyword}=useParams();
    const {pageNumber}=useParams()||1;
    const queryParams=new URLSearchParams(window.location.search);

    const shipping=queryParams.get("shipping");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const productList=useSelector((state)=>state.productList);
  const{loading,error,products,pages,page}=productList;
    useEffect(()=>{
   dispatch(ListProducts(keyword,pageNumber))
   if(shipping)
   {
    navigate("/shipping");
   }
    },[dispatch,navigate,keyword,pageNumber]);

    return(
        <>
        {!keyword&&<ProductCarousel />}
        <h1>Latest products</h1>
        {
            loading?(<Loader></Loader>):error?(<Message variant='danger'></Message>):
            (
            <>
        <Row>
            {
                products.map((product)=>{
                    return(
                    <Col key={product._id}sm={12} md={6} lg={4} xl={3}>
                <Product prop={product} />
                    </Col>
                    )
                })
            }
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword?keyword:''}/>
        </>
            )
        
}     
        </>
    )
}
export default HomeScreen;