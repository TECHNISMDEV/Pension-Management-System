import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { get_sr_data_action } from "../redux/actions/SRAction"
import { API_URL } from '../utils/commons';



const reg_payload = {
"sr_id": "",
"status": "",
"sr_type": "",
"owner_type":"",
"date_received":"",
"contact_name":"",
"contact_mobile":"",
"employer_type":"",
"emplyer_name":"",
"emplyer_id":"",
"nationality":"",
"nrc":"",
"prop_firstname":"",
"prop_lastname":"",
"prop_position":"",
"owner_name":"",
"owner_id":'',
"notes":""
}
const getSrDataByOwnerId = (ownerid)=>{

return axios.post(API_URL+'/serviceRequestByOwnerId/'+ownerid)

.then((response) => {
        console.log(response.data)
   
            return response.data;
          });
        }

        
const register_sr_employer = (sr_values)=>{

  
  console.log(sr_values)
  return sr_values;
          }
          
const register_sr_member = (sr_values)=>{


  console.log(sr_values)
  return sr_values;
          }

export default {
  getSrDataByOwnerId,
  register_sr_employer,
  register_sr_member

}
