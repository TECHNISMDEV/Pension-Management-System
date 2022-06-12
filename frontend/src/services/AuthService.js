import axios from 'axios';
import { API_URL } from '../utils/commons';


const payload = {
    "name":"",
    "pass":""
}

const login = (username,password)=>{

payload.name = username;
payload.pass = password;

console.log(payload);
console.log(process.env.NODE_ENV);
console.log(API_URL);
return axios.post(API_URL+'/user/login',payload).then((response) => {
            if (response.data) {
              //localStorage.setItem("cx_user", JSON.stringify(response.data));
              sessionStorage.setItem("cx_user", JSON.stringify(response.data));
            }
    
            return response.data;
          });
        }

 const logout = ()=>{
  sessionStorage.removeItem("cx_user")
}


export default {
    login,
    logout
}
