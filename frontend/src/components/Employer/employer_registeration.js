import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik,Field,FormikProvider } from 'formik'
import { set_tab_active } from '../../redux/actions/UserBehaviourAction';
import { AiOutlineSearch } from "react-icons/ai";
import { Modal, Button } from 'antd';
import { t_date, set_employ_registration, API_URL } from '../../utils/commons'
import axios from 'axios';
import 'antd/dist/antd.css';
import { formatDate,set_employ_save } from '../../utils/commons'
import { Tabs } from 'antd';
import Activities from './activities';

function Employer_registration(props) {
    const [emp_no, setemp_no] = useState(props.id)
    const reg_sr_values = useSelector(state => state.SRReducer).reg_sr_employer;
    const dispatch = useDispatch()
    const [isdisabled, setisdisabled] = useState(reg_sr_values ? false : true)

    const [isAddressModalVisible, setisAddressModalVisible] = useState(false);
    const [emp_name, setemp_name] = useState('')
    const [date_rec, setdate_rec] = useState('')
    const [city, setcity] = useState('')
    const [postal_Code, setpostal_Code] = useState('')
    const [State, setState] = useState('')
    const [area, setarea] = useState('')
    const { TabPane } = Tabs;

    useEffect(() => {
        if (emp_no) {
            setisdisabled(false)
            axios.get(API_URL+"/getCompanyById/" + emp_no).then(
                (res) => (
                    console.log(res.data),
                    setemp_name(res.data.name),
                    setdate_rec(formatDate(res.data.companyRegDate)),
                    setcity(res.data.address ? res.data.address.city : ''),
                    setpostal_Code(res.data.address ? res.data.address.postal_Code : ''),
                    setState(res.data.address ? res.data.address.state : 'NA'),
                    setarea(res.data.address ? res.data.address.adressLine1 : '')



                ))
        }
    }, [emp_no])

    const formik = useFormik({
        initialValues: {
            trading_name: emp_name ? emp_name : reg_sr_values.employer_name,
            primary_type: emp_no ? true : false,
            residency_area: area ? area : '',
            landmark: '',
            street_name: '',
            plot_no: '',
            box_no: '',
            postal_name: '',
            town: '',
            postal_code: postal_Code ? postal_Code : '',
            legal_name: '',
            contact_person: '',
            employer_type: reg_sr_values.employer_type,
            pacra_id: '',
            phone_no: '',
            email: '',
            season_flag: false,
            fax_no: '',
            employer_no: emp_no ? emp_no : '',
            employer_status: reg_sr_values.employer_name || emp_name? 'In Progress' : '',
            employer_sub_status: '',
            province: emp_no ? 'LUSAKA' : '',
            region: emp_no ? 'NORTHERN' : '',
            sector_code: '',
            date_received: date_rec,
            date_incorporated: '',
            holding_company: emp_name,
            subsidiary_company: '',
            date_incorporated: '',
            no_of_employees: '',
            date_of_employing: '',
            prop_pos:reg_sr_values? reg_sr_values.prop_position:'',
            prop_fname:reg_sr_values?reg_sr_values.prop_firstname:'',
            prop_lname:reg_sr_values?reg_sr_values.prop_lastname:'',
            nrc:reg_sr_values?reg_sr_values.nrc:'',
            nationality:reg_sr_values?reg_sr_values.nationality:''
        },
        enableReinitialize: true,
        onSubmit: (reg_sr_values,values) => {
            dispatch(register_sr_employer(values))
            console.log({...values,service_request_form:reg_sr_values})
            axios.post(API_URL+'/user/login',{...values,service_request_form:reg_sr_values}).then((response) => {
                       console.log(response)
                      });
                     }
,


        onChange: values => {
            formik.setValues(values)
        }
    })

    const register_sr_employer = (e) => {
        e.preventDefault();
        console.log({ ...formik.values, service_request_form: reg_sr_values })

        axios.post(API_URL + '/newServiceRequest', set_employ_registration({ ...formik.values, service_request_form: reg_sr_values })).then((response) => {
            console.log(response)
            alert("Successfully registered Employer!!")
        });

    }

    const save_emp = (e)=>{
        e.preventDefault();
        console.log(set_employ_save({...formik.values}))
        axios.post(API_URL + '/saveCompanyMember', set_employ_save({ ...formik.values })).then((response) => {
            console.log(response)
            alert("Successfully saved Employer!!")
        });
        alert("Successfully saved Employer!!")
    }

    const showAddressModal = () => {
        setisAddressModalVisible(true);
    };
    const handleRAOk = () => {
        setisAddressModalVisible(false);
    };

    const handleRACancel = () => {
        setisAddressModalVisible(false);
    };
    function callback(key) {
    }

    return (
        <div className="row p-1">
        <div class="card">
        <div class="card-body">


<FormikProvider value={formik}>
            <form className='form' onSubmit={formik.handleSubmit}>

                <Modal title="Residential Area" style={{ zIndex: 10000 }} visible={isAddressModalVisible} onOk={handleRAOk} onCancel={handleRACancel}>
                    <table>
                        <tbody className='fs-6'>
                            <tr>
                                <td className='p-1'> <label class="form-label float-end">Primary Type: </label></td>
                                <td className='p-1'><input class="form-check-input mx-5 float-start" type="checkbox" defaultValue={formik.values.primary_type} id="primary_type"
                                    name="primary_type" disabled={isdisabled}></input></td>
                            </tr>
                            <tr>
                                <td className='p-1'> <label class="form-label float-end">Area: </label></td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start mx-2'
                                    id="residency_area"
                                    name="residency_area"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.residency_area} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                            </tr>
                            <tr>
                                <td className='p-1'> <label class="form-label float-end">Landmark: </label></td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start mx-2'
                                    id="landmark"
                                    name="landmark"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.landmark} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                            </tr>
                            <tr>
                                <td className='p-1'><label class="form-label float-end">Street Name: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start mx-2'
                                    id="street_name"
                                    name="street_name"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.street_name} onChange={formik.handleChange} disabled={isdisabled} /></td>
                            </tr>
                            <tr>
                                <td className='p-1'> <label class="form-label float-end">Plot no: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start mx-2'
                                    id="plot_no"
                                    name="plot_no"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.plot_no} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                            </tr>
                            <tr>
                                <td className='p-1'>  <label class="form-label float-end">Box no: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start mx-2'
                                    id="box_no"
                                    name="box_no"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.box_no} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                            </tr>
                            <tr>
                                <td className='p-1'> <label class="form-label float-end">Postal Name: </label></td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start mx-2'
                                    id="postal_name"
                                    name="postal_name"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.postal_name} onChange={formik.handleChange} disabled={isdisabled} /></td>
                            </tr>
                            <tr>
                                <td className='p-1'>  <label class="form-label float-end">Town: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start mx-2'
                                    id="town"
                                    name="town"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.town} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                            </tr>
                            <tr>
                                <td className='p-1'><label class="form-label float-end">Postal Code: </label></td>
                                <td className='p-1'>  <input type="text"
                                    className='form-control float-start mx-2'
                                    id="postal_code"
                                    name="postal_code"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.postal_code} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
                <div className='row'>
                    <h1 className="display-5">{emp_name ? emp_name : reg_sr_values.employer_name}</h1>

                    <br /><br /><br />
                    <div class="px-2 m-2">
                        <table className="float-end">
                        <td className="px-3"> <button type="submit" className="btn btn-danger float-end rounded-pill" style={{ width: "200px"}} onClick={save_emp} >Save</button></td>
                        <td className="px-3">  <button type="submit" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={()=>{}} >Send for Approval</button></td>
                        <td className="px-3">  <button type="submit" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={()=>{}} >Accept</button></td>
                        <td className="px-3">  <button type="submit" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={()=>{}} >Reject</button></td>
                        </table>
                    </div>
                    <span>
                        <p className='lead fs-6'>Employer Details</p>

                        <hr />
                    </span>

                    <table>
                        <tbody className='fs-6'>
                            <tr>
                                <td className='p-1'>
                                    <label class="form-label float-end">Trading Name: </label> </td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start'
                                    id="trading_name"
                                    name="trading_name"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.trading_name} onChange={formik.handleChange} disabled /> </td>
                                <td className='p-1'><label class="form-label float-end">Legal Name: </label></td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start'
                                    id="legal_name"
                                    name="legal_name"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.legal_name} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                <td className='p-1'> <label class="form-label float-end">Employer Type: </label></td>
                                <td className='p-1'> <select class="form-select float-start" style={{ width: '230px' }} name='employer_type' id='employer_type' defaultValue={formik.values.employer_type} onChange={formik.handleChange} disabled={isdisabled}>
                                    <option value=''></option>
                                    <option defaultValue="Domestic Employer">Domestic Employer</option>
                                    <option defaultValue="Business Name">Business Name</option>
                                    <option defaultValue="Limited Company">Limited Company</option>
                                    <option defaultValue="ROS employer">ROS employer</option>
                                    <option defaultValue="Statutory">Statutory</option>

                                </select></td>
                                <td className='p-1'> <label class="form-label float-end">Fax no: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="fax_no"
                                    name="fax_no"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.fax_no} onChange={formik.handleChange} disabled={isdisabled} /></td>


                                <td className='p-1'></td>
                                <td className='p-1'></td>
                            </tr>
                            <tr>
                                <td className='p-1'>   <label class="form-label float-end">Residential Area:</label></td>
                                <td className='p-1'>  <input type="text"
                                    className='form-control float-start'
                                    id="trading_name"
                                    name="trading_name"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.residency_area} required disabled />
                                    <a className="p-0 mx-0" type="button" onClick={showAddressModal}>
                                        <AiOutlineSearch style={{ padding: '0px' }} size={30} color={'black'} />
                                    </a></td>

                                <td className='p-1'>  <label class="form-label float-end">Contact Person: </label></td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start'
                                    id="contact_person"
                                    name="contact_person"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.contact_person} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                <td className='p-1'><label class="form-label float-end">PACRA ID: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="pacra_id"
                                    name="pacra_id"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.pacra_id} onChange={formik.handleChange} disabled={isdisabled} /></td>
                               <td className='p-1'> <label class="form-label float-end">Seasonal/Regular Flag: </label></td>
                                <td className='p-1'><input class="form-check-input float-start mx-3" type="checkbox" defaultValue={formik.values.season_flag} id="season_flag"
                                    name="season_flag" disabled={isdisabled}></input></td>
                                
                            </tr>
                            <tr>
                                
                                <td className='p-1'> <label class="form-label float-end">Phone Number: </label></td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start'
                                    id="phone_no"
                                    name="phone_no"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.phone_no} required onChange={formik.handleChange} disabled={isdisabled} /></td>
                                <td className='p-1'> <label class="form-label float-end">Employer No: </label></td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start'
                                    id="employer_no"
                                    name="employer_no"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.employer_no} onChange={formik.handleChange} disabled />
                                </td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                            </tr>

                            <tr>
                                
                                <td className='p-1'> <label class="form-label float-end">Email: </label></td>
                                <td className='p-1'><input type="email"
                                    className='form-control float-start'
                                    id="email"
                                    name="email"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.email} onChange={formik.handleChange} disabled={isdisabled} />
                                </td>
                                <td className='p-1'><label class="form-label float-end">Employer Status: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="employer_status"
                                    name="employer_status"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.employer_status} onChange={formik.handleChange} disabled /></td>
                           <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                            </tr>
                            <tr>
                               
                                <td className='p-1'>   <label class="form-label float-end">Employer Sub Status:</label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="employer_sub_status"
                                    name="employer_sub_status"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.employer_sub_status} onChange={formik.handleChange} disabled /></td>
                             <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                            </tr>
                        </tbody>
                    </table>


                </div>

                <div className='row'>

                    <span>
                        <p className='lead fs-6'>Business Details</p>

                        <hr />
                    </span>

                    <table>
                        <tbody className='fs-6'>
                            <tr>
                                <td className='p-1'><label class="form-label float-end">Sector Code: </label></td>
                                <td className='p-1'><select class="form-select float-start" name='sector_code' id='sector_code' style={{ width: '230px' }} defaultValue={formik.values.sector_code} onChange={formik.handleChange} disabled={isdisabled}>
                                    <option value=''></option>
                                    <option defaultValue="0119">GROWING OF OTHER NON-PERENNIAL CORPS</option>
                                    <option defaultValue="1010">PROCESSING & PRESERVING OF MEAT</option>
                                    <option defaultValue="1020">PROCESSING & PRESERVING OF FISH, CRUSTACEANS&MOLLUSCS</option>
                                    <option defaultValue="1030">PROCESSING & PRESERVING OF FRUITS AND VEGETABLES</option>
                                    <option defaultValue="1050">MANUFACTURING DAIRY PRODUCTS</option>
                                    <option defaultValue="1071">MANUFACTURING BAKERY PRODUCTS</option>


                                </select></td>
                                <td className='p-1'> <label class="form-label float-end">Date Incorporated: </label></td>
                                <td className='p-1'>  <input type="date"
                                    className='form-control float-start'
                                    name='date_incorporated'
                                    id='date_incorporated'
                                    defaultValue={formik.values.date_incorporated} style={{ width: '230px' }} disabled={isdisabled} /></td>
                                <td className='p-1'>  <label class="form-label float-end">Date Started Employing: </label></td>
                                <td className='p-1'><input type="date"
                                    className='form-control float-start h-50'
                                    name='date_of_employing'
                                    id='date_of_employing'
                                    defaultValue={formik.values.date_of_employing} style={{ width: '230px' }} disabled={isdisabled} /></td>
                                <td className='p-1'><label class="form-label float-end">No of employees: </label></td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start'
                                    id="no_of_employees"
                                    name="no_of_employees"
                                    defaultValue={formik.values.no_of_employees} style={{ width: '230px' }} onChange={formik.handleChange} disabled={isdisabled} /></td>

                            </tr>
                            <tr>
                                <td className='p-1'><label class="form-label float-end text-wrap">Date Regis with NAPSA: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    name='date_received'
                                    id='date_received'
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.date_received} disabled /></td>
                                <td className='p-1'> <label class="form-label float-end">Holding Company: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="holding_company"
                                    name="holding_company"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.holding_company} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                <td className='p-1'><label class="form-label float-end">Subsidiary Company: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="subsidiary_company"
                                    name="subsidiary_company"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.subsidiary_company} onChange={formik.handleChange} disabled={isdisabled} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='row mt-5 mb-5'>
                    <span>
                        <p className='lead fs-6'>Properietors Details</p>

                        <hr />
                    </span>
                    <table>
                        <tbody className='fs-6'>
                        <tr>
                                <td className='p-1'> <label class="form-label float-end">Properietor Position:</label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="prop_pos"
                                    name="prop_pos"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.prop_pos} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                <td className='p-1'><label class="form-label float-end">Properietor Firstname: </label></td>
                                <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="prop_fname"
                                    name="prop_fname"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.prop_fname} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                <td className='p-1'>  <label class="form-label float-end">Properietor Lastname: </label></td>
                                <td className='p-1'><input type="text"
                                    className='form-control float-start'
                                    id="prop_lname"
                                    name="prop_lname"
                                    style={{ width: '230px' }}
                                    defaultValue={formik.values.prop_lname} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                <td className='p-1'>   <label class="form-label float-end">NRC NO: </label></td>
                                    <td className='p-1'>
                                 
                                        <input type="text"
                                            className='form-control float-start '
                                            name='nrc'
                                            id='nrc'
                                            style={{width:'230px'}}
                                            defaultValue={formik.values.nrc} onChange={formik.handleChange} disabled={isdisabled}/>
                                    </td>
                                
                            </tr>
                            <tr>
                            
                                    <td className='p-1'> <label class="form-label float-end">Nationality: </label></td>
                                   
                                   <td className='p-1'>
                                   <Field component="select" name='nationality' id='nationality' value={formik.values.nationality} className={"form-control float-start"} style={{ width: '230px' }}  onChange={ formik.handleChange } required disabled={isdisabled}>
                          
                                   <option defaultValue=" "></option>
                                        <option defaultValue="Zambian">Zambian</option>
                                        <option defaultValue="Foreigner">Foreigner</option>
                                        
                                  
                                    </Field>
                                  </td> 
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className='row'>
                    <span>
                        <p className='lead fs-6'>Location</p>

                        <hr />
                    </span>

                    <table>
                        <tbody className='fs-6'>
                            <tr>
                                <td className='p-1'> <label class="form-label float-end">Region: </label></td>
                                <td className='p-1'> <select class="form-select float-start" name='region' id='region' style={{ width: '230px' }} defaultValue={formik.values.region} onChange={formik.handleChange} disabled={isdisabled}>
                                    <option defaultValue=""></option>
                                    <option defaultValue="SOUTHERN">SOUTHERN</option>
                                    <option defaultValue="NORTHERN">NORTHERN</option>
                                </select></td>
                                <td className='p-1'><label class="form-label float-end">Province: </label></td>
                                <td className='p-1'> <select class="form-select float-start" name='province' id='province' style={{ width: '230px' }} defaultValue={formik.values.province} onChange={formik.handleChange} disabled={isdisabled}>
                                    <option defaultValue=""></option>
                                    <option defaultValue="1">LUSAKA</option>
                                    <option defaultValue="2">CENTRAL</option>
                                    <option defaultValue="6">EASTERN</option>
                                    <option defaultValue="8">WESTERN</option>
                                    <option defaultValue="9">SOUTHERN</option>

                                </select></td>
                                <td className='p-1'>  <label class="form-label float-end">Area: </label></td>
                                <td className='p-1'><select class="form-select float-start" name='area' id='area' style={{ width: '230px' }} defaultValue={formik.values.area} onChange={formik.handleChange} disabled={isdisabled}>
                                    <option defaultValue=""></option>
                                    <option defaultValue="7">CHIPATA</option>


                                </select></td>
                                <td className='p-1'>  <label class="form-label float-end">District: </label></td>
                                <td className='p-1'> <select class="form-select float-start" name='district' id='district' style={{ width: '230px' }} defaultValue={formik.values.employer_type} onChange={formik.handleChange} disabled={isdisabled}>
                                    <option defaultValue=""></option>
                                    <option defaultValue="1">MAMBWE</option>
                                    <option defaultValue="101">CHADIZA</option>
                                    <option defaultValue="102">CHAMA</option>
                                    <option defaultValue="111">CHIPATA</option>
                                    <option defaultValue="136">KATETE</option>

                                </select></td>
                            </tr>
                            <tr>
                                <td className='p-1'>   <label class="form-label float-end">Station: </label></td>
                                <td className='p-1'>   <select class="form-select float-start" name='station' id='station' style={{ width: '230px' }} defaultValue={formik.values.station} onChange={formik.handleChange} disabled={isdisabled}>
                                    <option defaultValue=""></option>
                                    <option defaultValue="27">CHIPATA</option>
                                    <option defaultValue="38">PETAUKE</option>
                                </select></td>
                                <td className='p-1'> <label class="form-label float-end">Zone: </label></td>
                                <td className='p-1'> <select class="form-select float-start" name='zone' id='zone' style={{ width: '230px' }} defaultValue={formik.values.zone} onChange={formik.handleChange} disabled={isdisabled}>
                                    <option defaultValue=""></option>
                                    <option defaultValue="240">KATETE,EAST CHANIDA ROAD</option>
                                    <option defaultValue="245">PETAUKE,MINGA AREA</option>
                                    <option defaultValue="6">EASTERN</option>
                                    <option defaultValue="8">WESTERN</option>
                                    <option defaultValue="9">SOUTHERN</option>

                                </select></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                                <td className='p-1'></td>
                            </tr>
                        </tbody>
                    </table>

                </div>


                <div className='row mt-5'>
                    <Tabs onChange={callback} defaultActiveKey='1' type="card">
                        <TabPane tab="Actions/Attachments" key="1">
                            <div className='row'>
                                <span>
                                    <p className='lead fs-6'>Activities</p>

                                    <hr />
                                </span>
                                <div className='col px-5'>
                                <Activities show={false} emp={emp_no}/>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Documents" key="2">

                        </TabPane>
                        <TabPane tab="Collections" key="3">

                        </TabPane>
                    </Tabs>
                </div>

            </form>
            </FormikProvider>
            </div>
        </div>
        </div>
    )
}

export default Employer_registration
