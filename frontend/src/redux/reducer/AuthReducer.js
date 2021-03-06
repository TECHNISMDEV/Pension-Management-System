import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_INPROGRESS,
    LOGOUT,
  } from "../actions/types/Authtypes";


  const user = JSON.parse(sessionStorage.getItem("cx_user"));

  const initialState = user ? { isLoggedIn: true, user ,isLoading:false} : { isLoggedIn: false, user: null, isLoading:false };

  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
          isLoading:false
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          isLoading:false
        };
      case LOGIN_INPROGRESS:
        return{
          ...state,
          isLoading:true
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }