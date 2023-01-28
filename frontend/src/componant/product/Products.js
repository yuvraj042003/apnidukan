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
import {Typography}  from "@material-ui/core";


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
  
  const [currentPage, setCurrentPage] = useState(1);
  const [amount, setAmount] = useState([0,25000]);
  const [category ,setCategory] = useState("")

  const { products,
          loading,
          error,
          productsCount,
          resultParPage,
          filteredProductsCount } = useSelector(
    (state) => state.products
  );
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  const priceHandler = (Event, newAmount) => {
    setAmount(newAmount);
  }
  const params = useParams();
  const keyword = params.keyword

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, amount, category));
  }, [dispatch, keyword, currentPage, amount, category]);
    
  let count = filteredProductsCount;
  return (
    <>
      <div>{loading ? <Loader /> : <>
        <h2 className="productsHeading">Products</h2>
        <div className="products">
          {
            products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          }
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider 
            value={amount}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
            />
          <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) =>(
                  <li className="category-link"
                   key={category}
                   onClick={()=> setCategory(category)}>
                   {category} 
                  </li>
                ))}
              </ul>
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
