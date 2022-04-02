import React from 'react'
import {Link} from "react-router-dom";
import{Carousel,Image} from "react-bootstrap"
import Loader from "../Components/loader.js"
import Message from './Message.js';
import { listTopProducts } from '../Actions/ProductActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const ProductCarousel=()=>{
    const dispatch=useDispatch()
    
    const productTopRated=useSelector(state=>state.productTopRated)
    const{loading,error,products}=productTopRated
 
    console.log(productTopRated)
    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])

    return loading?<Loader />:error?<Message variant='danger'>{error}</Message>:(
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product=>(
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`} >
                        <Image src={product.image} alt={product.name} fluid></Image>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            )
            )}
        </Carousel>
    )
        
  
}
export default ProductCarousel