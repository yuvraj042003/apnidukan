import {combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {legacy_createStore as createStore} from 'redux';
import { productReducer, productDetailsReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';


const reducer = combineReducers({
products:productReducer,
productDetails:productDetailsReducer,
user: userReducer,
});
let initialStore = {};
const middleWare = [thunk];
const store = createStore(
    reducer,
    initialStore,
    composeWithDevTools(applyMiddleware(...middleWare))
)
export default store;

