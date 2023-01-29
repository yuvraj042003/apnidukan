import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST ,
    REGISTER_USER_SUCCESS ,
    REGISTER_USER_FAIL,

    CLEAR_ERRORS,
} from "../../src/constant/userConstant";
import axios from "axios";

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
// Clear Error
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
    }