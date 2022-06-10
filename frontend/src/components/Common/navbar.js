import { React} from 'react'
import { MdPersonOutline } from "react-icons/md"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="navbar primary-navbar">
                    <div className="container-fluid">
                   
                    <Link className='text-decoration-none' to={"/dashboard"}> <p className="navbar-brand fs-2" >Pension Management Solution</p></Link>
                        <span className="d-flex">
                       
                            <div className="dropdown">
                                <a className="nav-link" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <MdPersonOutline size={35} color={"#ff1744"}/>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end " aria-labelledby="dropdownMenuButton">
                                    <li><Link className="dropdown-item pl-5" to={"/dashboard"}>Dashboard</Link></li>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Adminstration</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to={"/logout"}>Logout</Link></li>
                                </ul>
                            </div>
                        </span>
                    </div>
                </nav>
    )
}

export default Navbar
