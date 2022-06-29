import { React, useState } from 'react'
import { MdPersonOutline } from "react-icons/md"
import { Link } from "react-router-dom"

import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Logout from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
function Navbar() {
    const user = useSelector(state => state.AuthReducer).user;
    //const [iconName,setIconName] = useState(formIcon(user))
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const formIcon = (user) => {
        var firstName = user.firstName
        var lastName = user.lastName

        return firstName[0].toUpperCase() + lastName[0].toUpperCase()
    }

    const useStyles = makeStyles({
        menuDropDown: {
            '& div': {
                // this is just an example, you can use vw, etc.
                width: '250px',
                color: 'black',
                background: '#f2f2f2',
            }
        }
    });

    const classes = useStyles();

    return (
        <nav className="navbar primary-navbar">
            <div className="container-fluid">

                <Link className='text-decoration-none' to={"/dashboard"}> <p className="navbar-brand fs-2" >Pension Management Solution</p></Link>
                <span className="d-flex">

                    {/* <div className="dropdown">
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
                            </div> */}

                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>{formIcon(user)}</Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 20,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        className={classes.menuDropDown}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Typography component="div">
                            <MenuItem onClick={()=>{history.push('/dashboard')}}>
                                Dashboard
                            </MenuItem>
                            <MenuItem>
                                Adminstration
                            </MenuItem>
                           
                            <MenuItem>

                                Settings
                            </MenuItem>
                            <Divider sx={{ borderBottomWidth: 10 }}/>
                            <MenuItem onClick={()=>{history.push('/logout')}}>

                                <Box textAlign="left" m={1}>
                                    Logout
                                </Box>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                            </MenuItem>
                        </Typography>
                    </Menu>
                </span>
            </div>
        </nav>
    )
}

export default Navbar
