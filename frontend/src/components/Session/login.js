
import React, { useState } from 'react';
import {useSelector,useDispatch} from "react-redux"
import {Link, Redirect} from "react-router-dom"
import '../../asset/css/login.css';
import logo from '../../asset/img/logo.png';
import { login_action } from "../../redux/actions/AuthActions";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { isLoggedIn } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
  

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
        };
        
        const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
        };
        
        const handleLogin = (e) => {
        e.preventDefault();
        
        setLoading(true);
        
          dispatch(login_action(username, password));
                
        
          setLoading(false);
        
        };
        
        if (isLoggedIn) {
            console.log("login success",isLoggedIn);
          return <Redirect to={"/dashboard"}/>
        }
        

    return (
        <div className="container-fluid login-bg-frame">
            <div className="row text-center">

                <div className="col-sm">
                    <div className="login_frame card  top-50 start-50 translate-middle shadow p-5 mt-5 bg-white rounded">

                        <div className="card-body">
                            <div className="login-logo-frame">
                                <img className="login-logo" src={logo} alt="logo" />
                            </div>
                            
                            <div className="row pt-5">
                                <div className="col-sm">
                                <div class="form-group text-nowrap">
                                <label for="formGroupExampleInput" class="form-label px-2 fs-5  w-25">Username</label>
                                    <div className="input-group mb-3 ">
                                   
                                        <input type="text" className="form-control mx-3 w-50 rounded-pill" id="formGroupExampleInput" aria-label="Sizing example input" onChange={onChangeUsername}/>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                <div class="form-group text-nowrap">
                                <label for="formGroupExampleInput1" class="form-label px-2 fs-5  w-25">Password</label>
                                    <div className="input-group mb-3">
                                    
                                        <input type="password" className="form-control mx-3 w-50 rounded-pill" id="formGroupExampleInput1" aria-label="Sizing example input" onChange={onChangePassword}/>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm text-center">

                                    <div className="p-3 pb-5">
                                        <button className="btn btn-danger rounded-pill" style={{ width: "200px" }} variant="contained" color="secondary" onClick={handleLogin} disabled={loading}>Sign in</button>
                                    </div>
                                    <div className="float-start p-3">
                                        <Link className="nav-link" to={"login"}>Forgot Password?</Link>
                                    </div>
                                    <div className=" float-end p-3">
                                    <Link className="nav-link" to={"login"}>To Register?</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
