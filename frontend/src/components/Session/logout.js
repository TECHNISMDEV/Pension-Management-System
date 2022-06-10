
import {React,useEffect} from "react";
import '../../asset/css/login.css';
import {useDispatch} from "react-redux"
import { logout } from "../../redux/actions/AuthActions";
import { Link } from "react-router-dom"
import {useSelector} from "react-redux"

function Logout() {

    const { isLoggedIn } = useSelector(state => state.AuthReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        if(isLoggedIn){
        dispatch(logout());
        }
        return () => {
            console.log("session logged out")
        }
    }, [])

    
    return (
        <div className="container-fluid login-bg-frame">
           <div className="row text-center">

<div className="col-sm">
    <div className="card logout_frame top-50 start-50 translate-middle shadow p-5 mt-5 bg-white rounded">

        <div className="card-body">
            <div className="row p-3">
                <div className="col-sm text-center m-5 p-2">
                    <h5 className="card-title fs-2 login-title">Your session is logged out successfully!</h5>
                    <h3 className="lead pt-5">To login again <Link className="stretched-link" to={"/login"}>click here</Link>.</h3>
                    
                </div>
            </div>
            </div>

        </div>
    </div>
</div>
</div>
    )
}

export default Logout
