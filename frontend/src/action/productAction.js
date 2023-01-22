import { Action } from '@remix-run/router';
import axios from 'axios';
import { useActionData } from 'react-router-dom';

import {
ALL_PRODUCT_FAIL,
ALL_PRODUCT_REQUEST,
ALL_PRODUCT_SUCCESS,
PRODUCT_DETAILS_REQUEST,
PRODUCT_DETAILS_FAIL,
PRODUCT_DETAILS_SUCCESS,
CLEAR_ERRORS
} from '../constant/productConstants';

export const getProduct = (keyword="")=> async(dispatch)=>{
    try {
       dispatch({type:ALL_PRODUCT_REQUEST});
       let link = `http://localhost:4000/api/v1/products?keyword=${keyword}`
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
            payload:error.response.data.message,
        });
    }
}


// Clear Error
export const clearErrors = ()=> async(dispatch)=>{
dispatch({type:CLEAR_ERRORS});
}