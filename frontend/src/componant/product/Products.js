import React, { useEffect } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getProduct } from "../../action/productAction";
import ProductCard from "../layout/Headere/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

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
