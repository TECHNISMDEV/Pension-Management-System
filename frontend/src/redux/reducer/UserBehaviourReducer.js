import {
    TAB_ACTIVE,
    
  } from "../actions/types/UserBehaviortypes";


  const ACTIVE_TAB= {};

  const initialState = ACTIVE_TAB

  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case TAB_ACTIVE:
        return {
          ...state,
          ACTIVE_TAB: payload.ACTIVE_TAB
        };
      default:
        return state;
    }
  }