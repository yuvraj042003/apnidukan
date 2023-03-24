import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
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
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
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
        console.log("LoginInfo", data);
        localStorage.setItem('userInfo',JSON.stringify(data.user));
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
            payload:error.response.data.message,
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

/// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/users`);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };
  
  // get  User Details
  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  