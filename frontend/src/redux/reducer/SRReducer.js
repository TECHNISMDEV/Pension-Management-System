import {
    GET_SR_DATA_OWNERID,
    REGISTER_SR_EMPLOYER,
    REGISTER_SR_MEMBER,
  } from "../actions/types/SR_types";


 

  const initialState = {
    "SR_data":"",
    "reg_sr_employer":""

};

  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_SR_DATA_OWNERID:
        return {
          ...state,
          SR_data: payload.SR_data
         
        };
        case REGISTER_SR_EMPLOYER:
        return {
          ...state,
          reg_sr_employer: payload.reg_sr_employer
        };
        case REGISTER_SR_MEMBER:
        return {
          ...state,
          reg_sr_member: payload.reg_sr_member
        }
      default:
        return state;
    }
  }