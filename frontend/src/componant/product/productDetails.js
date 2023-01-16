import React from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearErrors, getProductDetails } from "../../action/productAction";

import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert';
import ReviewCard from './ReviewCard.js';
import Loader from "../layout/Loader/Loader";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log("product ---> ", product);
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
  return (
    <>
    (
      loading ? <Loader/>:
    ):(
    (product ? 
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
          <h1>{`₹ ${product.price} `} </h1>
          <div className="detailsBlock-3.1">
                <div className="detailsBlock-3.1.1">
                    <button>-</button>
                    <input value="1" type="number"/>
                    <button>+</button>
                </div>{" "}
                <button>Add to Cart</button>

        </div>
        <p>
            Status: {
              <b className={product.stock<1 ? "recolor":"greencolor"} >
              {product.stock<1 ? "OutOfStock":"InStock"} 
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
    : "product factching")
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
