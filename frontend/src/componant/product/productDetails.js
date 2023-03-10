import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearErrors, getProductDetails } from "../../action/productAction";

import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert';
import ReviewCard from './ReviewCard.js';
import { addItemsToCart } from "../../action/cartAction";



const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, error } = useSelector(
    (state) => state.productDetails
  );
  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    alert.success("Item Added To Cart");
  };

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch,params.id, error, alert]);

  const options = {
    edit:true,
    color:"rgba(20,20,20, 0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 500 ? 15:20,
    value:product.ratings,
    isHalf:true
  }

  const [quantity, setQuantity] = useState(1)
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  return (
    <>
    <div className="ProductDetils">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImag"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
      

      <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span>({product.noOfReviews} Reviews)</span>
          </div>
          <div className="detailsBlock-3">
          <h1>{`₹ ${product.price}`} </h1>
          <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input  readOnly  type="number" value={quantity}/>
                    <button onClick={increaseQuantity}>+</button>{" "}
                    
                  </div>{"  "}
                <button 
                disable={product.Stock<1 ? true:false}
                onClick={addToCartHandler}>Add to Cart</button> 

            </div>
            
            <p>
            
            Status: {
              <b className={product.Stock < 1 ? "redColor":"greenColor"} >
              {product.Stock<1 ? "OutOfStock":"InStock"} 
              </b>
            }
          </p>
        </div>
        <div className="detailsBlock-4">
        Description: <p>{product.description}</p>
        </div>

        
        <button className="submitReview">Submit Review</button> 
      </div>
     
    </div>
    
    <h3 className="reviewsHandling">Reviews</h3>
    {product.reviews && product.reviews[0] ?
    (
      <div className="reviews">
      {
        product.reviews && product.reviews.map((review) => <ReviewCard review={review}/>)
      }
      </div>
    ):(
      <p className="noReviews">No Reviews Yet</p>
    )})
    </>
  );                                                                                    
};


export default ProductDetails;
