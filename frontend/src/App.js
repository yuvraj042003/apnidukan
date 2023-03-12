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
import Profile from './componant/User/Profile.js';
import store from "./store";
import { loadUser} from "./action/userAction";
import UserOptions from "./componant/layout/Headere/UserOptions.js"
import { useSelector } from "react-redux";
<<<<<<< HEAD
//import ProtectedRoute from "./componant/Route/ProtectedRoute";
=======
// import ProtectedRoute from "./componant/Route/ProtectedRoute";
>>>>>>> e02dc71f51c4fafd5e28ad88b468e0975ad8dcb4
import UpdateProfile from "./componant/User/UpdateProfile.js";
import UpdatePassword from "./componant/User/UpdatePassword.js";
import ForgotPassword from "./componant/User/ForgotPassword.js";
import ResetPassword from "./componant/User/ResetPassword.js";
import Cart from "./componant/Cart/Cart.js";
import Shipping from "./componant/Cart/Shipping";
import ConfirmOrder from "./componant/Cart/ConfirmOrder.js";
import Payment from "./componant/Cart/Payment.js";
import OrderSuccess from "./componant/Cart/OrderSuccess.js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./componant/Order/MyOrders.js";
import OrderDetails from "./componant/Order/OrderDetails.js";
<<<<<<< HEAD
=======


>>>>>>> e02dc71f51c4fafd5e28ad88b468e0975ad8dcb4
import {useState} from "react";
import axios from "axios"
import { Elements } from "@stripe/react-stripe-js";
import Dashboard from "././componant/Admin/Dashboard"
import ProductList from "././componant/Admin/ProductList.js"
import NewProduct from "././componant/Admin/NewProduct.js"
function App() {
  
  const { isauthenticatedUser, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
      
      store.dispatch(loadUser());
      getStripeApiKey();
  }, [])

  return (
    <>
    <BrowserRouter>
      <Header />
      
        <Routes>
          {stripeApiKey && ( 
          <Elements stripe={loadStripe(stripeApiKey)}>
          <Route extact path="/process/payment" element={ <Payment/>} />
          </Elements>
          )}
            {isauthenticatedUser && <UserOptions user={ user } />}
            <Route extact path="/" element={ <Home/> } />
            <Route extact path="/product/:id" element={ <ProductDetails/> } />
            <Route extact path="/products" element={ <Products/> } />
            <Route path="/products/:keyword" element={ <Products/> } />
            <Route extact path="/search" element={ <Search/> } />
            <Route extact path="/account" element={<Profile/>} />
            <Route extact path="/login" element={ <LoginSignUp/>} />
            <Route extact path="/profile/update" element={ <UpdateProfile/> } />
            <Route extact path="/password/update" element={ <UpdatePassword/> } />
            <Route extact path="/password/forgot" element={ <ForgotPassword/> } />
            <Route extact path="/password/reset/:token" element={ <ResetPassword/> } />
            <Route extact path="/cart" element={ <Cart/>} />
            <Route extact path="/shipping" element={ <Shipping/>} />
<<<<<<< HEAD
            <Route extact path="/success" element={ <OrderSuccess/>} />
            <Route extact path="/orders" element={ <MyOrders/>} />
            {/* USE SWITCH FOR PREVENT THE LOADING ERRORS */}
            <Route extact path="/order/confirm" element={ <ConfirmOrder/>} />
            <Route extact path="/order/:id" element={ <OrderDetails/>} />
            {/* See Admin protcected route command */}
            <Route isAdmin={true} extact path="/admin/dashboard" element={ <Dashboard/>} />
            <Route isAdmin={true} extact path="/admin/products" element={ <ProductList/>} />
            <Route isAdmin={true} extact path="/admin/new/product" element={ <NewProduct/>} />
=======
            <Route extact path="/order/confirm" element={ <ConfirmOrder/>} />
            <Route extact path="/success" element={ <OrderSuccess/>} />
            <Route extact path="/orders" element={ <MyOrders/>} />
            <Route extact path="/order" element={ <OrderDetails/>} />
>>>>>>> e02dc71f51c4fafd5e28ad88b468e0975ad8dcb4
           
            {/* <Route extact path="/product/:id" element={<ProductDetails/> } /> */}
        </Routes>
      <Footer />
     </BrowserRouter>

    </>
  );
}

export default App;
