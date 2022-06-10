import {
    GET_SR_DATA_OWNERID,
    REGISTER_SR_EMPLOYER,
    REGISTER_SR_MEMBER,
  } from "./types/SR_types";
  import SRService from "../../services/SRService"
  import {set_tab_active} from '../actions/UserBehaviourAction'


  export const get_sr_data_action = (ownerid) => (dispatch) => {
   
    return SRService.getSrDataByOwnerId(ownerid).then(
      (data) => {
        if(data){
          dispatch({
            type: GET_SR_DATA_OWNERID,
            payload: { SR_data: data },
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
      }
    );
        
  }


  export const register_sr_employer = (sr_values) => (dispatch) => {
    dispatch(set_tab_active(2))
    SRService.register_sr_employer(sr_values)
    console.log(sr_values)
    dispatch({
              type: REGISTER_SR_EMPLOYER,
              payload: { reg_sr_employer: sr_values },
           });
  }
  export const register_sr_member = (sr_values) => (dispatch) => {
    dispatch(set_tab_active(4))
    SRService.register_sr_member(sr_values)
    console.log(sr_values)
    dispatch({
              type: REGISTER_SR_MEMBER,
              payload: { reg_sr_member: sr_values },
           });
  }