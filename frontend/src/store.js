import {combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {legacy_createStore as createStore} from 'redux';
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, productReducer } from './reducers/productReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderReducer } from './reducers/orderReducer';

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
newProduct:newProductReducer,
product:productReducer,
allOrders:allOrdersReducer,
order:orderReducer,
allUsers: allUsersReducer,
userDetails: userDetailsReducer,


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

