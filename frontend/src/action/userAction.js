import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST ,
    REGISTER_USER_SUCCESS ,
    REGISTER_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    CLEAR_ERRORS,
} from "../../src/constant/userConstant";
import axios from "axios";

// Login Function
export const login = (email, password)=> async(dispatch)=>{
    try {
       dispatch({type:LOGIN_REQUEST});
       const config = {Headers: {"Content-Type": "application/json"}}
       let link = `http://localhost:4000/api/v1/login`
        const {data} = await axios.post(link,
         {email,password},
         config );

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user,
        })
    } catch (error) {
        
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.error,
        });
    }
};

// Register User
export const register = (userData)=> async(dispatch)=>{
    try {
        dispatch({type:REGISTER_USER_REQUEST});
        const config = {Headers: {"Content-Type": "application/json"}}
        let link = `http://localhost:4000/api/v1/register`
         const {data} = await axios.post(link,
          userData,
          config );
 
         dispatch({
             type:REGISTER_USER_SUCCESS,
             payload:data.user,
         })
     } catch (error) {
         
         dispatch({
             type:REGISTER_USER_FAIL,
             payload:error.response.data.error,
         });
     }
}

// Loading User Function
export const loadUser = ()=> async(dispatch)=>{
    try {
       dispatch({type:LOAD_USER_REQUEST});
      
       let link = `http://localhost:4000/api/v1/me`
        const {data} = await axios.get(link);

        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user,
        })
    } catch (error) {
        
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.error,
        });
    }
};

// LOGOUT USER FUNCTION 

export const logoutUser = ()=> async(dispatch)=>{
    try {
       dispatch({type:LOAD_USER_REQUEST});
      
       let link = `http://localhost:4000/api/v1/me`
        const {data} = await axios.get(link);

        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user,
        })
    } catch (error) {
        
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.error,
        });
    }
};

// Clear Error
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
    }