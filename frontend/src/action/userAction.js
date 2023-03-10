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

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

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
        console.log("user dataa-->", data);
        localStorage.setItem('userInfo',JSON.stringify(data.user));
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
        const {data} = JSON.parse(localStorage.getItem("userInfo"));
        console.log("user dataa-->", data);
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

export const logout = ()=> async(dispatch)=>{
    try {
        let link = `http://localhost:4000/api/v1/logout`
        await axios.get(link);
        dispatch({
            type:LOGOUT_SUCCESS,
            
        })
    } catch (error) {
        
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.error,
        });
    }
};

// UpdatePrfile User
export const updateProfile = (userData)=> async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const config = {Headers: {"Content-Type": "application/json"}}
        let link = `http://localhost:4000/api/v1/profile/update`
         const {data} = await axios.put(link,
          userData,
          config );
 
         dispatch({
             type:UPDATE_PROFILE_SUCCESS,
             payload:data.success,
         })
     } catch (error) {
         
         dispatch({
             type:UPDATE_PROFILE_FAIL,
             payload:error.response.data.error,
         });
     }
}

// UpdatePassword User
export const updatePassword = (passwords)=> async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST});
        const config = {Headers: {"Content-Type": "application/json"}}
        let link = `http://localhost:4000/api/v1/password/update`
         const {data} = await axios.put(link,
          passwords,
          config );
 
         dispatch({
             type:UPDATE_PASSWORD_SUCCESS,
             payload:data.success,
         })
     } catch (error) {
         
         dispatch({
             type:UPDATE_PASSWORD_FAIL,
             payload:error.response.data.error,
         });
     }
}


// Forgot Password

export const forgotPassword = (email)=> async(dispatch)=>{
    try {
       dispatch({type:FORGOT_PASSWORD_REQUEST});
       const config = {Headers: {"Content-Type": "application/json"}}
       let link = `http://localhost:4000/api/v1/password/forgot`
        const {data} = await axios.post(link,
         {email},
         config );

        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message,
        })
    } catch (error) {
        
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.response.data.error,
        });
    }
};

// Reset Password

export const resetPassword = (token, passwords)=> async(dispatch)=>{
    try {
       dispatch({type:RESET_PASSWORD_REQUEST});
       const config = {Headers: {"Content-Type": "application/json"}}
       let link = `http://localhost:4000/api/v1/password/reset/${token}`
        const {data} = await axios.put(link,
         passwords,
         config );

        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.error,
        });
    }
};

// Clear Error
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
    }