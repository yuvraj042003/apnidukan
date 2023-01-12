import  Header  from "../src/componant/layout/Headere/Header"
import  Footer  from "./componant/layout/Footer/Footer" 
//import WebFont from "webfontloader"
import { BrowserRouter,
         Routes,
         Route } from "react-router-dom";
//import React, { useEffect } from "react";
import Home from "./componant/layout/Home.js"
import Loader from "./componant/layout/Loader/Loader";
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
            <Route extact path="/sad" element={ <Loader/> } />
            {/* <Route extact path="/product/:id" element={<ProductDetails/> } /> */}
        </Routes>
      <Footer />
     </BrowserRouter>

    </>
  );
}

export default App;
