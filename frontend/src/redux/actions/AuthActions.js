import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "./types/Authtypes";
  import AuthService from "../../services/AuthService"

  export const login_action = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        if(data){
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data},
          });
        }
       
      },
      (error) => {
        const msg =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
          payload:{message:msg}
        });
      }
    );
        
  }
  
  

  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };