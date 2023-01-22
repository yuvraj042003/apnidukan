import React from "react";
import  Header  from "../src/componant/layout/Headere/Header"
import  Footer  from "./componant/layout/Footer/Footer" 
//import WebFont from "webfontloader"
import { BrowserRouter,
         Routes,
         Route } from "react-router-dom";
//import React, { useEffect } from "react";
import Home from "./componant/layout/Home.js"
import ProductDetails from "./componant/product/productDetails.js";
import Products from './componant/product/Products.js'
import Search from './componant/product/Search.js'

// import ProductDetails from './componant/product/ProductDetails.js';

function App() {
  // React.useEffect(()=>{
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "Droid Sans", "Chilanka"],
  //     },
  //   });
  // }, []);
  return (
    <>
    <BrowserRouter>
      <Header />
        <Routes>
            <Route extact path="/" element={ <Home/> } />
            <Route extact path="/product/:id" element={ <ProductDetails/> } />
            <Route extact path="/products" element={ <Products/> } />
            <Route path="/products/:keyword" element={ <Products/> } />
            <Route extact path="/search" element={ <Search/> } />
           
            {/* <Route extact path="/product/:id" element={<ProductDetails/> } /> */}
        </Routes>
      <Footer />
     </BrowserRouter>

    </>
  );
}

export default App;
