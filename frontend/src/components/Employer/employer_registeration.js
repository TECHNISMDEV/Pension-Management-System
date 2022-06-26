import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik, Field, FormikProvider } from 'formik'
import { set_tab_active } from '../../redux/actions/UserBehaviourAction';
import { AiOutlineSearch } from "react-icons/ai";
import { Modal, Button } from 'antd';
import { t_date, set_employ_registration, API_URL } from '../../utils/commons'
import axios from 'axios';
import 'antd/dist/antd.css';
import { formatDate, set_employ_save } from '../../utils/commons'
import { Tabs } from 'antd';
import Activities from './activities';
import { _ } from 'lodash'
import ChecklistUpload from './checklistUpload';

function Employer_registration(props) {
    const [emp_no, setemp_no] = useState(props.id)
    const reg_sr_values = useSelector(state => state.SRReducer).reg_sr_employer;
    const dispatch = useDispatch()
    const [isdisabled, setisdisabled] = useState(reg_sr_values ? false : true)
    const [companyData, setCompanyData] = useState({})
    const [isAddressModalVisible, setisAddressModalVisible] = useState(false);
    const [emp_name, setemp_name] = useState('')
    const [date_rec, setdate_rec] = useState('')
    const [city, setcity] = useState('')
    const [postal_Code, setpostal_Code] = useState('')
    const [State, setState] = useState('')
    const [area, setarea] = useState('')
    const { TabPane } = Tabs;
    const [srForm, setSrForm] = useState(props.srForm)
    const _ = require("lodash");  
    useEffect(() => {
        if (emp_no) {
            setisdisabled(false)
            getCompanyDetails()
        }
    }, [emp_no])


    const getCompanyDetails = () => {
        axios.get(API_URL + "/getCompanyById/" + emp_no).then(
            (res) => (
                console.log(res.data),
                setCompanyData(res.data),
                setemp_name(res.data.name),
                setdate_rec(formatDate(res.data.companyRegDate)),
                setcity(res.data.address ? res.data.address.city : ''),
                setpostal_Code(res.data.address ? res.data.address.postal_Code : ''),
                setState(res.data.address ? res.data.address.state : 'NA'),
                setarea(res.data.address ? res.data.address.adressLine1 : '')

            ))
    }

    const formik = useFormik({
        initialValues: {
            srId: srForm.id,
            companyName: companyData.id ? companyData.name : '',
            companyNumber: companyData.id ? companyData.id : '',
            trading_name: companyData.id ? companyData.name : '',
            legalName: companyData.id ? companyData.legalName : '',
            primary_type: companyData.id ? true : false,
            residencyArea: companyData.address ? companyData.address.adressLine1 : '',
            status: '',
            subStatus: '',
            postal_code: companyData.address  ? companyData.address.postalCode : '',
            legal_name: companyData.legalName,
            contact_person: '',
            employer_type: '',
            pacraId: '',
            phoneNo: '',
            email: '',
            seasonFlag: true,
            fax: '',
            employer_status: companyData.id ? 'In Progress' : '',
            employer_sub_status: '',
            province: emp_no ? 'LUSAKA' : '',
            region: emp_no ? 'NORTHERN' : '',
            sector_code: '',
            date_received: date_rec,
            dateIncorporated: companyData.created,
            holding_company: emp_name,
            subsidiary_company: '',
            dateRegistered: companyData.created,
            no_of_employees: '',
            dateEmployed: companyData.created,          
            nrc: companyData.id ? '' : '',
            nationality: companyData.address ? companyData.address.country : '',
            propFirstName:companyData.propFirstName,
            propLastName:companyData.propLastName,
            propPosition:companyData.propPosition
        },
        enableReinitialize: true,
        onSubmit: (reg_sr_values, values) => {

            console.log({ ...values, service_request_form: reg_sr_values })

        }
        ,


        onChange: values => {
            formik.setValues(values)
        }
    })


    const save_emp = (e) => {
        e.preventDefault();
        console.log(set_employ_save({ ...formik.values }))
        axios.post(API_URL + '/newServiceRequest', set_employ_save({ ...formik.values })).then((response) => {
            console.log(response)
            getCompanyDetails()
            alert("Successfully saved Employer!!")
        }).catch((error) => {
            alert("Failed to save employer details!!")
        })

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


                            <div className='row'>
                                <div className='col'>
                                    <h1 className="display-5">{emp_name ? emp_name : reg_sr_values.employer_name}</h1>
                                </div>
                                <div className='col float-end'>
                                    <p className='font-weight-bold font-italic fs-6 float-end '><i>Last Updated : {formatDate(companyData.lastUpdated)}</i></p>
                                </div>



                                <div class="px-2 m-2">
                                    <table className="float-end">
                                        <td className="px-3"> <button type="submit" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={save_emp} >Save</button></td>
                                        <td className="px-3">  <button type="button" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={() => { }} >Send for Approval</button></td>
                                        <td className="px-3">  <button type="button" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={() => { }} >Accept</button></td>
                                        <td className="px-3">  <button type="button" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={() => { }} >Reject</button></td>
                                    </table>
                                </div>
                                <div className='col'>
                                    <p className='lead mx-3'>Employer Details</p>
                                    <hr />
                                </div>
                                <table style={{ width: "100%" }}>
                                    <tbody className='fs-6'>

                                        <tr className='p-1'>
                                            <td className='p-1 tcx-form-label'><label className='form-label float-end'>Employer Name :  </label>
                                            </td>
                                            <td className='p-1' colSpan={3}>
                                                <input type="text" className='form-control float-start '
                                                    id="companyName"
                                                    name="companyName"
                                                    style={{ width: '100%' }}
                                                    defaultValue={formik.values.companyName} value={formik.values.companyName.toUpperCase()} onChange={formik.handleChange} disabled={isdisabled} />
                                            </td>



                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Legal Name :  </label>
                                            </td>
                                            <td className='p-1' colSpan={3}>
                                                <input type="text" className='form-control float-start '
                                                    id="legalName"
                                                    name="legalName"
                                                    style={{ width: '100%' }}
                                                    defaultValue={_.defaultTo(formik.values.legalName,'').toUpperCase()} 
                                                    value={_.defaultTo(formik.values.legalName,'').toUpperCase()} onChange={formik.handleChange} disabled={isdisabled} />
                                            </td>

                                        </tr>
                                        <tr className='p-1'>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Employer # : </label></td>
                                            <td className='p-1'> <input type="text"
                                                className='form-control float-start '
                                                name='id'
                                                id='id'
                                                style={{ width: '230px' }}
                                                defaultValue={formik.values.companyNumber} onChange={formik.handleChange} disabled /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Employer Type :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="type"
                                                name="type"
                                                style={{ width: '100%' }}
                                                value={companyData.type} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>PACRA ID :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="pacraId"
                                                name="pacraId"
                                                style={{ width: '100%' }}
                                                defaultValue={formik.values.pacraId} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Seasonal/Regular Flag :  </label></td>
                                            <td className='p-1'>
                                                <input type="checkbox" className='float-start '
                                                    id="seasonFlag"
                                                    name="seasonFlag"

                                                    defaultValue={formik.values.seasonFlag} onChange={formik.handleChange} disabled={isdisabled} checked={formik.values.seasonFlag} /></td>
                                        </tr>
                                        <tr className='p-1'>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Phone # :  </label></td>
                                            <td className='p-1'> <input type="text"
                                                className='form-control float-start '
                                                name='contactNo'
                                                id='contactNo'
                                                style={{ width: '230px' }}
                                                value={''} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Email ID :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="type"
                                                name="type"
                                                style={{ width: '100%' }}
                                                value={''} onChange={formik.handleChange} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Fax :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="pacraId"
                                                name="pacraId"
                                                style={{ width: '100%' }}
                                                defaultValue={''} onChange={formik.handleChange} disabled={isdisabled} /></td>

                                        </tr>
                                        <tr className='p-1'>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Residential Address:  </label></td>
                                            <td className='p-1' colSpan={3}> <input type="text"
                                                className='form-control float-start '
                                                name='id'
                                                id='id'
                                                style={{ width: '100%' }}
                                                defaultValue={_.defaultTo(formik.values.residencyArea,'')} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Status :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="pacraId"
                                                name="pacraId"
                                                style={{ width: '100%' }}
                                                defaultValue={formik.values.status} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Sub Status :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="seasonFlag"
                                                name="seasonFlag"
                                                style={{ width: '100%' }}
                                                defaultValue={formik.values.subStatus} disabled={isdisabled} /></td>
                                        </tr>

                                    </tbody>
                                </table>

                            </div>

                            {/* <div className='row'>

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
                                                    style={{ width: '230px' }}
                                                    defaultValue={formik.values.nrc} onChange={formik.handleChange} disabled={isdisabled} />
                                            </td>

                                        </tr>
                                        <tr>

                                            <td className='p-1'> <label class="form-label float-end">Nationality: </label></td>

                                            <td className='p-1'>
                                                <Field component="select" name='nationality' id='nationality' value={formik.values.nationality} className={"form-control float-start"} style={{ width: '230px' }} onChange={formik.handleChange} required disabled={isdisabled}>

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

                            </div> */}

<div className='col pt-3'>
                <p className='lead mx-3'>Business Details</p>
                <hr />
            </div>
            <table style={{ width: "100%" }}>
                <tbody className='fs-6'>

                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Holding Company :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='holdingCompany'
                            id='holdingCompany'
                            style={{ width: '230px' }}
                            defaultValue={_.defaultTo(formik.values.holdingCompany)} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Subsidiary Company :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            defaultValue={formik.values.subsidaryCompany} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Sector Code :  </label></td>
                        <td className='p-1'> 
                        {/* <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            defaultValue={formik.values.sectorCode}  disabled={isdisabled} /> */}

                        <select class="form-select float-start" name='sector_code' id='sector_code' style={{ width: '230px' }} defaultValue={formik.values.sector_code} onChange={formik.handleChange} disabled={isdisabled}>
                                                <option value=''></option>
                                                <option defaultValue="0119">GROWING OF OTHER NON-PERENNIAL CORPS</option>
                                                <option defaultValue="1010">PROCESSING & PRESERVING OF MEAT</option>
                                                <option defaultValue="1020">PROCESSING & PRESERVING OF FISH, CRUSTACEANS&MOLLUSCS</option>
                                                <option defaultValue="1030">PROCESSING & PRESERVING OF FRUITS AND VEGETABLES</option>
                                                <option defaultValue="1050">MANUFACTURING DAIRY PRODUCTS</option>
                                                <option defaultValue="1071">MANUFACTURING BAKERY PRODUCTS</option>


                                            </select>
                            </td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Number of Employees :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="seasonFlag"
                            name="seasonFlag"
                            style={{ width: '100%' }}
                            defaultValue={formik.values.numberOfEmployees} onChange={formik.handleChange} disabled={isdisabled} /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Incorporated :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='dateIncorporated'
                            id='dateIncorporated'
                            style={{ width: '230px' }}
                            defaultValue={formatDate(Date.parse(formik.values.dateIncorporated))} 
                            value={formatDate(Date.parse(formik.values.dateIncorporated))} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Started Employing :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="dateEmployed"
                            name="dateEmployed"
                            style={{ width: '100%' }}
                            defaultValue={formatDate(Date.parse(formik.values.dateEmployed))} value={formatDate(Date.parse(formik.values.dateEmployed))}  onChange={formik.handleChange} disabled={isdisabled} /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Registered with NAPSA :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="dateRegistered"
                            name="dateRegistered"
                            style={{ width: '100%' }}
                            value={formatDate(Date.parse(formik.values.dateRegistered))} onChange={formik.handleChange} disabled={isdisabled} /></td>

                    </tr>
                
                </tbody>
            </table>

            <div className='col pt-3'>
                <p className='lead mx-3'>Properietor Details</p>
                <hr />
            </div>
            <table style={{ width: "100%" }}>
                <tbody className='fs-6'>

                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>First Name :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='propFirstName'
                            id='propFirstName'
                            style={{ width: '230px' }}
                            defaultValue={_.defaultTo(formik.values.propFirstName,'')} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Last Name :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="propLastName"
                            name="propLastName"
                            style={{ width: '100%' }}
                            defaultValue={_.defaultTo(formik.values.propLastName,'')}  onChange={formik.handleChange} disabled={isdisabled} /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>NRC # :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="nrc"
                            name="nrc"
                            style={{ width: '100%' }}
                            value={_.defaultTo(formik.values.nrc,'')}  disabled={isdisabled} /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Nationality :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="nationality"
                            name="nationality"
                            style={{ width: '100%' }}
                            defaultValue={_.defaultTo(formik.values.nationality,'')} onChange={formik.handleChange}  disabled={isdisabled} /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Position :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='propPosition'
                            id='propPosition'
                            style={{ width: '230px' }}
                            defaultValue={_.defaultTo(formik.values.propPosition,'')} onChange={formik.handleChange} disabled={isdisabled} /></td>
                       

                    </tr>
                
                </tbody>
            </table>

            <div className='col pt-3'>
                <p className='lead mx-3'>Location Details</p>
                <hr />
            </div>
            <table style={{ width: "100%" }}>
                <tbody className='fs-6'>

                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Region :  </label></td>
                        <td className='p-1'> 
                             <Field component="select" id="region" name="region" defaultValue={_.defaultTo(formik.values.region,'')} className={"form-control float-start"} style={{ width: '230px' }} onChange={formik.handleChange} disabled={isdisabled} >
                                                <option value=' '></option>
                                                 <option value='Northern'>NORTHERN</option>
                                                <option value='Southern'>SOUTHERN</option>

                                            </Field>
                            </td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Province :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="province"
                            name="province"
                            style={{ width: '230px' }}
                            defaultValue={formik.values.province} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Area :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="area"
                            name="area"
                            style={{ width: '230px' }}
                            defaultValue={_.defaultTo(formik.values.area,'')}  disabled={isdisabled} /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>District :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="district"
                            name="district"
                            style={{ width: '230px' }}
                            defaultValue={_.defaultTo(formik.values.district,'')} onChange={formik.handleChange} disabled={isdisabled} /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Station :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='station'
                            id='station'
                            style={{ width: '230px' }}
                            defaultValue={_.defaultTo(formik.values.station,'')} onChange={formik.handleChange} disabled={isdisabled} /></td>
                       
                       <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Zone :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='zone'
                            id='zone'
                            style={{ width: '230px' }}
                            defaultValue={_.defaultTo(formik.values.zone,'')} onChange={formik.handleChange} disabled={isdisabled} /></td>
                    </tr>
                
                </tbody>
                </table>
                            <div className='row mt-5'>
                                <Tabs onChange={callback} defaultActiveKey='1' type="card">
                                    <TabPane tab="Checklist (Attachments)" key="1">
                                        <div className='row'>
                                            <span>
                                                <p className='lead fs-6'>Checklist</p>

                                                <hr />
                                            </span>
                                            <div className='col px-5'>
                                                {/* <Activities show={false} emp={emp_no} /> */}
                                                <ChecklistUpload empNumber={emp_no}/>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Contacts" key="2">
                                        <div className='row'>
                                            <span>
                                                <p className='lead fs-6'>Contacts</p>

                                                <hr />
                                            </span>
                                            <div className='col px-5'>

                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Addresses" key="3">
                                        <div className='row'>
                                            <span>
                                                <p className='lead fs-6'>Addresses</p>

                                                <hr />
                                            </span>
                                            <div className='col px-5'>

                                            </div>
                                        </div>
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
