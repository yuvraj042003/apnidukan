import {combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {legacy_createStore as createStore} from 'redux';
<<<<<<< HEAD
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, productReducer } from './reducers/productReducer';
=======
import { productReducer, productDetailsReducer, newReviewReducer } from './reducers/productReducer';
>>>>>>> e02dc71f51c4fafd5e28ad88b468e0975ad8dcb4
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { myOrdersReducer, newOrderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
products:productsReducer,
productDetails:productDetailsReducer,
user: userReducer,
profile:profileReducer,
forgotPassword:forgotPasswordReducer,
cart:cartReducer,
newOrder:newOrderReducer,
myOrders:myOrdersReducer,
newReview:newReviewReducer,
<<<<<<< HEAD
newProduct:newProductReducer,
product:productReducer,
=======


>>>>>>> e02dc71f51c4fafd5e28ad88b468e0975ad8dcb4
});
let initialStore = {cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
}};
const middleWare = [thunk];
const store = createStore(
    reducer,
    initialStore,
    composeWithDevTools(applyMiddleware(...middleWare))
)
export default store;

