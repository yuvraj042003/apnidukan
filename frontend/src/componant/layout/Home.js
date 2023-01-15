import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import "../layout/Headere/Home.css";
import Product from "./Headere/ProductCard.js";
import MetaData from './metadata';
import {getProduct} from '../../action/productAction';
import {useDispatch, useSelector} from 'react-redux';
 import Loader from './Loader/Loader';
 import { useAlert } from 'react-alert';
 


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading, error, products, productCount} = useSelector(
    (state) =>state.products
  ); 
  useEffect(() => {
    
    if(error){
      return alert.error(error)
    }
    dispatch(getProduct());
  }, [dispatch, error, alert ])
  
  return (
    <>
      {
        loading ? <Loader/>:<>
      <MetaData title="Apni Dukan"/>
      <div className="banner">
      <h1>Welcome to Apni dukan</h1>
      <p>Find Amazing product below</p>
      <Link className='scrol' to="container"><button className='btn'><b>Scroll </b></button></Link>
      
      </div>
      <h2 className='homeHeading'>Featured Products</h2>
      <div className="container" id="container">
        
       {
        products && products.map(product => (
          <Product product={product}/>
        ))
       }
      </div>
  </>
      }
    </>
   
  )
};

export default Home;