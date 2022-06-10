import axios from 'axios';


const payload = {
    "name":"",
    "pass":""
}
const API_URL = "http://localhost:8080";

const login = (username,password)=>{

payload.name = username;
payload.pass = password;

console.log(payload);

return axios.post(API_URL+'/app/user/login',payload)

.then((response) => {
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
