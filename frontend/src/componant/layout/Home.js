import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import "../layout/Headere/Home.css";
import Product from "../layout/Headere/Product.js";
import MetaData from './metadata';
const product = {
  name:"T-Shirt",
  images : [{ url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSQ1cQfLl0KUpHtZ16CubbHTP_n3W9udcZl1pLQNsSJ81tD0PMlkNanBUIN9V1OCSKUu4OgP6PhpHBWgdvs48gXbdLGn2jVxhamR0FvouoBYDES2B0uNt1XtA&usqp=CAc"}],
  _id:"yuvraj",
  price:"₹360"
}

const Home = () => {
  return (
    <>
      <MetaData title="Apni Dukan"/>
      <div className="banner">
      <h1>Welcome to Apni dukan</h1>
      <p>Find Amazing product below</p>
      <Link className='scrol' to="container"><button className='btn'><b>Scroll</b></button></Link>
      
      </div>
      <h2 className='homeHeading'>Featured Products</h2>
      <div className="container" id="container">
       <Product product={product}/>
       <Product product={product}/>
       <Product product={product}/>
       <Product product={product}/>

       <Product product={product}/>
       <Product product={product}/>
       <Product product={product}/>
       <Product product={product}/>
      </div>
  </>
   
  )
    
  
};

export default Home;