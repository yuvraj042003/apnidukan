import React, { useEffect } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getProduct } from "../../action/productAction";
import ProductCard from "../layout/Headere/ProductCard";
import Pagination from "react-js-pagination";
import { useState } from "react";
import { useParams } from 'react-router-dom'
import Slider from '@material-ui/core/slider';
import { Typography } from "@material-ui/core";
import {useAlert} from "react-alert";
import MetaData from "../layout/metadata";
const categories = [
  "Laptop",
  "Watches",
  "Camras",
  "Air Conditionar",
  "Accesrise",
  "Mobile",
  "Fashion & Style",
  "Men Shirt",
  "Men Jeans",
  "Woman Shirt ",
  "Fashin & Beauty"
]



const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)

  const { products,
    loading,
    error,
    productsCount,
    resultParPage,
    } = useSelector(
      (state) => state.products
    );
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  const priceHandler = (Event, newAmount) => {
    setPrice(newAmount);
  }
  const params = useParams();
  const keyword = params.keyword

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category,ratings));
  }, [dispatch, keyword, currentPage, price, category,ratings,alert, error]);
  
  return (
    <>
      <div>{loading ? <Loader /> : <>
        <MetaData title="Products" />
        <h2 className="productsHeading">Products</h2>
        <div className="products">
          {
            products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          }
           <div className="filterBox">
            <Typography><b>Price</b></Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography><b>Categories</b></Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}>
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider value={ratings}
                onChange={(e, newRatings) => {
                  setRatings(newRatings);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          

          <div className="paginatonBox">
            <Pagination activePage={currentPage}
              itemsCountPerPage={resultParPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </div>
      </>}</div>
    </>
  );
};

export default Products;
