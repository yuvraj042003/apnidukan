import React from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductDetails } from "../../action/productAction";

import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";


const productDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log(params.id);
  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch,params.id]);

  const options = {
    edit:true,
    color:"rgba(20,20,20, 0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 500 ? 15:20,
    value:2.8,
    isHalf:true
  }
  return (
    <>
      <div className="ProductDetils">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImag"
                  key={item.url}
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
    </>
  );
};


export default productDetails;
