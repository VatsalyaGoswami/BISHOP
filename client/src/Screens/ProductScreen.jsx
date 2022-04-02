import React ,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {Row,Col,Image,ListGroup,Card,Button, Form, ListGroupItem} from "react-bootstrap";
import Loader from "../Components/loader";
import Message from "../Components/Message";
import Rating from "../Components/Rating";
import { useParams } from "react-router-dom";
import { ListProductDetails ,createProductReview} from "../Actions/ProductActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Constants/ProductConstants";
const ProductScreen=({})=>{
const [qty,setQty]=useState(1);
const [rating,setRating]=useState(0)
const[comment,setComment]=useState('')

    const dispatch=useDispatch();
    const {_id}=useParams();


    
       
   const productDetails=useSelector((state)=>state.productDetails)
   const{loading,error,product}=productDetails;


   const productReviewCreate=useSelector((state)=>state.productReviewCreate)
   const{success:successProductReview,error:errorProductReview}=productReviewCreate

   const userLogin=useSelector((state)=>state.userLogin)
   const{userInfo}=userLogin;
  
useEffect(()=>{
    if(successProductReview)
    {
        alert('Review submitted!')
        setRating(0)
        setComment('')
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
dispatch(ListProductDetails(_id))
},[dispatch,_id,successProductReview]);
  
const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(createProductReview(_id,{
        rating,
        comment
    }))
}

return(
    <>
    <Link className="btn btn-light" to="/">Go Back</Link>
    {loading?(<Loader></Loader>):error?<Message variant='danger'>{error}</Message>:
    <>
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
        <ListGroup  variant='flush'>
         <ListGroup.Item>
             <h2>{product.name}</h2>
         </ListGroup.Item>
         <ListGroup.Item>
             <Rating val={product.rating} text={` ${product.numReviews} Reviews`}></Rating>
         </ListGroup.Item>
         <ListGroup.Item>price:${product.price}</ListGroup.Item>
         <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={3}>
        <Card >
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Price:</Col>
                        <Col>
                        <strong>${product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>status:</Col>
                        <Col>
                        {product.countinstock>0?"In stock":"out of stock"}
                        </Col>
                    </Row>
                </ListGroup.Item>
               {
   
                     (  (product.countinstock>0)&&<ListGroup.Item>
                   <Row>
                       <Col>QTY</Col>
                       <Col>
                      <Form.Control as='select' value={qty} onChange={(e)=>
                      setQty(e.target.value)}>
                     {
                          [...Array(product.countinstock).keys()].map((x) =>(
                          <option key={x+1} value={x+1}>{x+1}</option>
                          ))
                       }
                      </Form.Control>
                    
                       </Col>
                   </Row>
                       </ListGroup.Item>
                     )
               }  
            </ListGroup>
            <ListGroup.Item>
                <Link to={`/cart/${_id}?qty=${qty}`}>
                <Button 
                className="btn-block" type="button"  >
                    Add to Cart
                    </Button>
                    </Link>
            </ListGroup.Item>
        </Card>
        </Col>
    </Row>
    <Row>
        <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length===0&&<Message> No Reviews</Message>}
            <ListGroup variant='flush'>
                {product.reviews.map(review=>(
                    <ListGroup.Item key={review._id}>
                     <strong>{review.name}</strong>
                     <Rating val={review.rating} />
                     <p>{review.createdAt.substring(0,10)}</p>
                     <p>{review.comment}</p>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item>
                    <h2>Write a customer Review</h2>
                    {errorProductReview&&<Message variant='danger'>{errorProductReview}</Message>}
                    {userInfo ? (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="rating">
                                <Form.Label >Rating</Form.Label>
                                <Form.Control  as='select' value={rating} onChange={(e)=>
                                setRating(e.target.value)}>
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId=" comment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as='textarea'row='3'
                                onChange={(e)=>setComment(e.target.value)}></Form.Control>

                            </Form.Group>
                            <Button type='submit' variant='primary'>Submit</Button>
                        </Form>
                    ) :<Message>please  <Link to='/login'>sign in</Link>  to write a review{' '}</Message>}
                </ListGroup.Item>
            </ListGroup>
        </Col>
    </Row>
    </>
    
}
    </>
);

}
export default ProductScreen;