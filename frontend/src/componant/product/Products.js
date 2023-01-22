import React, { useEffect} from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getProduct } from "../../action/productAction";
import ProductCard from "../layout/Headere/ProductCard";
import Pagination from "react-js-pagination";
import { useState } from "react";
import {useParams} from 'react-router-dom'

const Products = ({match}) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );
  const setCurrentPageNo = (e) =>{
    setCurrentPage(e)
  }
  const params = useParams();
  const keyword = params.keyword

  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <div>{loading ? <Loader /> : <>
        <h2 className="productsHeading">Products</h2>
        <div className="products">
        {
          products && 
          products.map((product)=>(
            <ProductCard key={product._id} product={product} />   
          ))
        }
        <div className="paginatonBox">
        <Pagination activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
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
