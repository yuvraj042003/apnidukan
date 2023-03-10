import axios from 'axios';
import { config } from 'dotenv';

import {
ALL_PRODUCT_FAIL,
ALL_PRODUCT_REQUEST,
ALL_PRODUCT_SUCCESS,
PRODUCT_DETAILS_REQUEST,
PRODUCT_DETAILS_FAIL,
PRODUCT_DETAILS_SUCCESS,
NEW_REVIEW_REQUEST,
NEW_REVIEW_SUCCESS,
NEW_REVIEW_FAIL,

CLEAR_ERRORS
} from '../constant/productConstants';

export const getProduct = (keyword="", currentPage=1, amount= [0,25000], category, ratings = 0)=> async(dispatch)=>{
    try {
       dispatch({type:ALL_PRODUCT_REQUEST});
       let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${amount[0]}&price[lte]=${amount[1]}`
        if(category){
            link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${amount[0]}&price[lte]=${amount[1]}&category=${category}`
        }
        const {data} = await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.error,
        });
    }
}
// GET PRODUCT DETAILS 
export const getProductDetails = (id)=> async(dispatch)=>{
    try {
       dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`http://localhost:4000/api/v1/products/${id}`);
            
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data,
        })
    } catch (error) {
        
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.error,
        });
    }
}
// NEW REVIEW
export const newReview = (reviewData)=> async(dispatch)=>{
    try {
       dispatch({type:NEW_REVIEW_REQUEST});
       const config = {
        headers: {"Content-Type":"application/json"}
    };
        const {data} = await axios.put(`http://localhost:4000/api/v1/review`,reviewData, config);
        
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.error,
        });
    }
}


// Clear Error
export const clearErrors = ()=> async(dispatch)=>{
dispatch({type:CLEAR_ERRORS});
}