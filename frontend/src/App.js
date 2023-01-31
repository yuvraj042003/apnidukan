import React from "react";
import  Header  from "../src/componant/layout/Headere/Header"
import  Footer  from "./componant/layout/Footer/Footer" 
import { BrowserRouter,
         Routes,
         Route,  } from "react-router-dom";
import Home from "./componant/layout/Home.js"
import ProductDetails from "./componant/product/productDetails.js";
import Products from './componant/product/Products.js'
import Search from './componant/product/Search.js'
import LoginSignUp from './componant/User/LoginSignUp.js';
//import WebFont from "webfontloader";
import store from "./store";
import { loadUser } from "./action/userAction";
import UserOptions from "./componant/layout/Headere/UserOptions.js"
import { useSelector } from "react-redux";



function App() {
  
  const { isauthenticatedUser, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    // WebFont.load({
    //   google: {
    //     families: ["Roboto", "Droid", "Chilanka"]
    //   }
    // })
      store.dispatch(loadUser());
  }, [])

  return (
    <>
    <BrowserRouter>
      <Header />
      
        <Routes>
            {isauthenticatedUser && <UserOptions user={ user } />}
            <Route extact path="/" element={ <Home/> } />
            <Route extact path="/product/:id" element={ <ProductDetails/> } />
            <Route extact path="/products" element={ <Products/> } />
            <Route path="/products/:keyword" element={ <Products/> } />
            <Route extact path="/search" element={ <Search/> } />
            <Route extact path="/login" element={ <LoginSignUp/> } />
           
            {/* <Route extact path="/product/:id" element={<ProductDetails/> } /> */}
        </Routes>
      <Footer />
     </BrowserRouter>

    </>
  );
}

export default App;
