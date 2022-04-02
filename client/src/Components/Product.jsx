import React from "react";
import {Card} from "react-bootstrap";
import Rating from "./Rating";
import propTypes from"prop-types";
import { Link } from "react-router-dom";
const Product =({prop})=>{
    return( 
        <> 
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${prop._id}`}>
       <Card.Img src={prop.image} variant='top' />
   </Link>
   <Card.Body>
   <Link to={`/product/${prop._id}`}>
       <Card.Title as="div">
          <strong> {prop.name}</strong>
       </Card.Title>
   </Link>
   <Card.Text as="div">
     <Rating val={prop.rating}
      text={`${prop.numReviews}reviews`}
    
      />
   </Card.Text>
   <Card.Text as='h3'>
${prop.price}
   </Card.Text>
   </Card.Body>
    </Card>

    </>
    )
}
Rating.defaultProps={
    color:'#f5d442'
}
Rating.propTypes={
val:propTypes.number.isRequired,
text:propTypes.string.isRequired,
vcolor:propTypes.string,
}
export default Product;