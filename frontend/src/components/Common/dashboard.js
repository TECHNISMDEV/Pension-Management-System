

import { React, useState ,useEffect} from 'react'

import { Redirect } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import Navbar from "./navbar"
import { makeStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBar from '@material-ui/core/AppBar';
import Home from '../Home/home'
import Service from '../Service/service'
import Return from '../Returns/return'
import Employer from '../Employer/employer';
import { set_tab_active } from '../../redux/actions/UserBehaviourAction';
import Members from '../Members/members';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Collections from '../Collections/collections';
import EmployerList from '../Employer/employer_list';
import Returns from '../Returns/returns';

const theme = createMuiTheme({
    overrides: {
    MuiAppBar:{
        root:{
            zIndex:0,
        }
    }
        ,
      MuiTab: {
        root: {
            fontSize: 21,
            fontStyle: 'bold',
            zIndex: 0,
            textTransform:'capitalize',
                
          "&$selected": {
            backgroundColor: grey[800],
            color: grey[50],
           
          }
        }
      }
    }
  });


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

function Dashboard(props) {
    
    const { match, history } = props;
    const { params } = match;
    const { page,id } = params;

    const tabNameToIndex = {
        0: "home",
        1: "service",
        2:"employer",
        3:"returns",
        4:"member",
        5:"collections"
      };
    
      const indexToTabName = {
        home: 0,
        service: 1,
        employer:2,
        returns:3,
        member:4,
        collections:5
      };

    const user_activity = useSelector(state => state.UserBehaviourReducer).ACTIVE_TAB;
    const { isLoggedIn } = useSelector(state => state.AuthReducer);
const [req_id, setreq_id] = useState(id)

    const [value, setValue] = useState(indexToTabName[page]);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {

        history.push(`/dashboard/${tabNameToIndex[newValue]}`);
        dispatch(set_tab_active(newValue))
        setValue(newValue);
    };

    useEffect(() => {
        if(user_activity){
            setValue(user_activity)
        }
       
    }, [user_activity])


    if (!isLoggedIn) {
        return <Redirect to={"/login"} />
       
    }

    return (
        <div className="container-fluid h-100 p-0">
            <div className="row">

                <Navbar />
            </div>
            <div className="row">
            <MuiThemeProvider theme={theme}>
                    <AppBar position="static" color="default">

                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            TabIndicatorProps={{
                                style: { display:"none"}
                              }}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs"
                            
                        >
                            <Tab label={<b >Home</b>} />
                            <Tab label={<b>Services</b>}  />
                            <Tab label={<b>Employers</b>} />
                            <Tab label={<b>Returns</b>} />
                            <Tab label={<b>Members</b>} />
                            <Tab label={<b>Collections</b>} />
                            <Tab label={<b>Pensions</b>} />
                            <Tab label={<b>Lumpsums</b>} />
                            <Tab label={<b>Claims</b>} />
                            <Tab label={<b>Certificates</b>} />
                            <Tab label={<b>Admin-Collections</b>}/>
                            <Tab label={<b>Agreement Collections</b>} />
                            <Tab label={<b>Contribution Reports</b>} />
                            <Tab label={<b>All Service Requests </b>} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Home />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Service id={req_id}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                    <EmployerList/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                       {/* <Return /> */}
                       <Returns/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Members/>
                     </TabPanel>
                    <TabPanel value={value} index={5}>
                        <Collections/>
                   </TabPanel>
                    <TabPanel value={value} index={6}>
                        <div className='row p-3 mx-2'>
                              <div className='card' style={{height:'250px'}}>
                                    <h1 className='display-6 text-center mt-5'>Module under development.</h1>
                                    <p className='lead text-center'>This module is under developement and will be available soon.</p>
                              </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                    <div className='row p-3 mx-2'>
                              <div className='card' style={{height:'250px'}}>
                                    <h1 className='display-6 text-center mt-5'>Module under development.</h1>
                                    <p className='lead text-center'>This module is under developement and will be available soon.</p>
                              </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                    <div className='row p-3 mx-2'>
                              <div className='card' style={{height:'250px'}}>
                                    <h1 className='display-6 text-center mt-5'>Module under development.</h1>
                                    <p className='lead text-center'>This module is under developement and will be available soon.</p>
                              </div>
                        </div>
                     </TabPanel>
                    <TabPanel value={value} index={9}>
                    <div className='row p-3 mx-2'>
                              <div className='card' style={{height:'250px'}}>
                                    <h1 className='display-6 text-center mt-5'>Module under development.</h1>
                                    <p className='lead text-center'>This module is under developement and will be available soon.</p>
                              </div>
                        </div>
                     </TabPanel>
                     <TabPanel value={value} index={10}>
                    <div className='row p-3 mx-2'>
                              <div className='card' style={{height:'250px'}}>
                                    <h1 className='display-6 text-center mt-5'>Module under development.</h1>
                                    <p className='lead text-center'>This module is under developement and will be available soon.</p>
                              </div>
                        </div>
                     </TabPanel>
                     <TabPanel value={value} index={11}>
                    <div className='row p-3 mx-2'>
                              <div className='card' style={{height:'250px'}}>
                                    <h1 className='display-6 text-center mt-5'>Module under development.</h1>
                                    <p className='lead text-center'>This module is under developement and will be available soon.</p>
                              </div>
                        </div>
                     </TabPanel>
                     <TabPanel value={value} index={12}>
                    <div className='row p-3 mx-2'>
                              <div className='card' style={{height:'250px'}}>
                                    <h1 className='display-6 text-center mt-5'>Module under development.</h1>
                                    <p className='lead text-center'>This module is under developement and will be available soon.</p>
                              </div>
                        </div>
                     </TabPanel>
                     <TabPanel value={value} index={13}>
                    <div className='row p-3 mx-2'>
                              <div className='card' style={{height:'250px'}}>
                                    <h1 className='display-6 text-center mt-5'>Module under development.</h1>
                                    <p className='lead text-center'>This module is under developement and will be available soon.</p>
                              </div>
                        </div>
                     </TabPanel>
                     
</MuiThemeProvider>
                </div>
        

        </div>
    )
}

export default Dashboard

