import React, { useEffect } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getProduct } from "../../action/productAction";
import ProductCard from "../layout/Headere/ProductCard";

const Products = ({match}) => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword

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

        </div>
      </>}</div>
    </>
  );
};

export default Products;
