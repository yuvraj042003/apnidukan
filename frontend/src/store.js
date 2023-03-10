import {combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {legacy_createStore as createStore} from 'redux';
import { productReducer, productDetailsReducer, newReviewReducer } from './reducers/productReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { myOrdersReducer, newOrderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
products:productReducer,
productDetails:productDetailsReducer,
user: userReducer,
profile:profileReducer,
forgotPassword:forgotPasswordReducer,
cart:cartReducer,
newOrder:newOrderReducer,
myOrders:myOrdersReducer,
newReview:newReviewReducer,


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

