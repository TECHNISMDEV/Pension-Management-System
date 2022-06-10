import {
    TAB_ACTIVE,
    
  } from "./types/UserBehaviortypes";
 

  export const set_tab_active = (value) => (dispatch) => {
   
        if(value){
          dispatch({
            type: TAB_ACTIVE,
            payload: { ACTIVE_TAB: value },
          });
        }
        
  }
