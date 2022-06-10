import { React, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import { AiOutlineSearch } from "react-icons/ai";
import { Modal, Button } from 'antd';
import { t_date, set_member_registration,formatDate } from '../../utils/commons'
import axios from 'axios';
import { set_tab_active } from '../../redux/actions/UserBehaviourAction';

import { Tabs } from 'antd';
import Activities from '../Employer/activities';
function Member_registration() {
    const reg_sr_values = useSelector(state => state.SRReducer).reg_sr_member;
    const dispatch = useDispatch()
    const [isdisabled, setisdisabled] = useState(reg_sr_values?false:true)
    const [isAddbenf, setisAddbenf] = useState(false)

    const [isAddressModalVisible, setisAddressModalVisible] = useState(false);
    const API_URL = "http://localhost:8080/app";
    const [benf_row_data, setbenf_row_data] = useState([])
    const [emp_no, setemp_no] = useState('')
    function callback(key) {
    }
    const { TabPane } = Tabs;
    const formik = useFormik({
        initialValues: {
            nrc:reg_sr_values?reg_sr_values.nrc:'',
            primary_type: false,
            residency_area: '',
            landmark: '',
            street_name: '',
            plot_no: '',
            box_no: '',
            postal_name: '',
            town: '',
            postal_code: '',
           status:reg_sr_values?'In Progress':'',
            contact_person: '',
          
            beneficiaries:benf_row_data,
        
            phone_no: '',
            email: '',
          
            pros_center: 'HEAD OFFICE',
            fax_no: '',
            employer_no: emp_no,
           
            sector_code: '',
            date_received:  t_date().year + '-' + t_date().month + '-' + t_date().date,
            date_joined_napsa:'',
            date_joined_employer:'',
            date_incorporated: '',
          
        },
        enableReinitialize: true,
        // onSubmit: (reg_sr_values,values) => {
        //     //dispatch(register_sr_employer(values))
        //     console.log({...values,service_request_form:reg_sr_values})
        //     // axios.post(API_URL+'/app/user/login',{...values,service_request_form:reg_sr_values}).then((response) => {
        //     //            console.log(response)
        //     //           });
        //              }



        onChange: values => {
            formik.setValues(values)
        }
    })

    const register_sr_employer = (e) => {
        e.preventDefault();
        console.log({ ...formik.values, service_request_form: reg_sr_values })

         axios.post(API_URL+'/saveCompanyMember',set_member_registration({...formik.values,service_request_form:reg_sr_values})).then((response) => {
              console.log(response)
             });
             
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

    const AddBenfhandleOk = () => {
        setbenf_row_data(benf_row_data.concat({
            "benf_status":formik.values.benf_status,
            "benf_id":formik.values.benf_id,
            "benf_nrc":formik.values.benf_nrc,
            "benf_rel_code":formik.values.benf_rel_code,
            "benf_rel_val":formik.values.benf_rel_val,
            "benf_surname":formik.values.benf_surname,
            "benf_othername":formik.values.benf_othername,
            "benf_dob":formik.values.benf_dob

        }))
        console.log(benf_row_data)
        formik.setFieldValue(formik.values.benf_status,'')
        formik.setFieldValue(formik.values.benf_id,'')
        formik.setFieldValue(formik.values.benf_nrc,'')
        formik.setFieldValue(formik.values.benf_rel_code,'')
        formik.setFieldValue(formik.values.benf_rel_val,'')
        formik.setFieldValue(formik.values.benf_surname,'')
        formik.setFieldValue(formik.values.benf_othername,'')
        formik.setFieldValue(formik.values.benf_dob,'')
        
        setisAddbenf(false)
    }

    const AddBenfhandleCancel = () => {
        setisAddbenf(false)
    }

    return (

        <div>



            <form className='form' onSubmit={formik.handleSubmit}>

            <Modal title="Residential Area" style={{zIndex:10000}} visible={isAddressModalVisible} onOk={handleRAOk} onCancel={handleRACancel}>
                   <table>
                       <tbody className='fs-6'>
                           <tr>
                               <td className='p-1'> <label class="form-label float-end">Primary Type: </label></td>
                               <td className='p-1'><input class="form-check-input mx-5 float-start"  type="checkbox" defaultValue={formik.values.primary_type} id="primary_type"
                            name="primary_type" disabled={isdisabled}></input></td>
                           </tr>
                           <tr>
                               <td className='p-1'> <label class="form-label float-end">Area: </label></td>
                               <td className='p-1'><input type="text"
                            className='form-control float-start mx-2'
                            id="residency_area"
                            name="residency_area"
                            style={{width:'230px'}}
                            defaultValue={formik.values.residency_area} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                           </tr>
                           <tr>
                               <td className='p-1'> <label class="form-label float-end">Landmark: </label></td>
                               <td className='p-1'><input type="text"
                            className='form-control float-start mx-2'
                            id="landmark"
                            name="landmark"
                            style={{width:'230px'}}
                            defaultValue={formik.values.landmark} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                           </tr>
                           <tr>
                               <td className='p-1'><label class="form-label float-end">Street Name: </label></td>
                               <td className='p-1'> <input type="text"
                            className='form-control float-start mx-2'
                            id="street_name"
                            name="street_name"
                            style={{width:'230px'}}
                            defaultValue={formik.values.street_name} onChange={formik.handleChange} disabled={isdisabled} /></td>
                           </tr>
                           <tr>
                               <td className='p-1'> <label class="form-label float-end">Plot no: </label></td>
                               <td className='p-1'> <input type="text"
                            className='form-control float-start mx-2'
                            id="plot_no"
                            name="plot_no"
                            style={{width:'230px'}}
                            defaultValue={formik.values.plot_no} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                           </tr>
                           <tr>
                               <td className='p-1'>  <label class="form-label float-end">Box no: </label></td>
                               <td className='p-1'> <input type="text"
                            className='form-control float-start mx-2'
                            id="box_no"
                            name="box_no"
                            style={{width:'230px'}}
                            defaultValue={formik.values.box_no} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                           </tr>
                           <tr>
                               <td className='p-1'> <label class="form-label float-end">Postal Name: </label></td>
                               <td className='p-1'><input type="text"
                            className='form-control float-start mx-2'
                            id="postal_name"
                            name="postal_name"
                            style={{width:'230px'}}
                            defaultValue={formik.values.postal_name} onChange={formik.handleChange} disabled={isdisabled} /></td>
                           </tr>
                           <tr>
                               <td className='p-1'>  <label class="form-label float-end">Town: </label></td>
                               <td className='p-1'> <input type="text"
                            className='form-control float-start mx-2'
                            id="town"
                            name="town"
                            style={{width:'230px'}}
                            defaultValue={formik.values.town} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                           </tr>
                           <tr>
                               <td className='p-1'><label class="form-label float-end">Postal Code: </label></td>
                               <td className='p-1'>  <input type="text"
                            className='form-control float-start mx-2'
                            id="postal_code"
                            name="postal_code"
                            style={{width:'230px'}}
                            defaultValue={formik.values.postal_code} onChange={formik.handleChange} required disabled={isdisabled} /></td>
                           </tr>
                       </tbody>
                   </table>
                </Modal>
                <div className='row'>

                    <div class="px-5 m-2">
                        <button type="submit" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={register_sr_employer}>Register</button>
                    </div>
                    <span>
                        <p className='lead fs-6'>Member Information</p>

                        <hr />
                    </span>

                  <table>
                      <tbody className='fs-6'>
                          <tr>
                              <td className='p-1'> <label class="form-label float-end">NRC NO: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                name='nrc'
                                id='nrc'
                                style={{width:'230px'}}
                                defaultValue={formik.values.nrc} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'> <label class="form-label float-end">Social Security Number: </label></td>
                              <td className='p-1'><input type="text"
                                className='form-control float-start h-50'
                                id="ssn"
                                name="ssn"
                                style={{width:'230px'}}
                                defaultValue={formik.values.ssn} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'> <label class="form-label float-end">Passport Number: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="passport_no"
                                name="passport_no"
                                style={{width:'230px'}}
                                defaultValue={formik.values.passport_no} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'>   <label class="form-label float-end">Title: </label></td>
                              <td className='p-1'>   <select class="form-select float-start" name='employer_type' id='employer_type'  style={{width:'230px'}} defaultValue={formik.values.marital_status} onChange={formik.handleChange} disabled={isdisabled}>
                                <option defaultValue="Mr">Mr.</option>
                                <option defaultValue="Ms">Ms.</option>
                                <option defaultValue="Mrs">Mrs.</option>
                            </select></td>
                          </tr>
                          <tr>
                              <td className='p-1'>     <label class="form-label float-end">Surname: </label></td>
                              <td className='p-1'><input type="text"
                                className='form-control float-start'
                                name='surname'
                                id='surname'
                                style={{width:'230px'}}
                                defaultValue={formik.values.surname} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'> <label class="form-label float-end">Othernames: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="othernames"
                                name="othernames"
                                style={{width:'230px'}}
                                defaultValue={formik.values.othernames} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'>  <label class="form-label float-end">Maiden Name: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="maiden_name"
                                name="maiden_name"
                                style={{width:'230px'}}
                                defaultValue={formik.values.maiden_name} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'>   <label class="form-label float-end">Sex: </label></td>
                              <td className='p-1'>   <select class="form-select float-start" name='employer_type' id='employer_type' style={{width:'230px'}} defaultValue={formik.values.marital_status} onChange={formik.handleChange} disabled={isdisabled}>
                                <option defaultValue="Male">Male</option>
                                <option defaultValue="Female">Female</option>
                                <option defaultValue="Others">Others</option>
                            </select></td>
                          </tr>
                          <tr>
                              <td className='p-1'>  <label class="form-label float-end">Date of Birth: </label></td>
                              <td className='p-1'><input type="date"
                                    className='form-control float-start'
                                    name='dob'
                                    id='dob'
                                    style={{width:'230px'}}
                                    defaultValue={formik.values.dob} onChange={(e)=>formik.setFieldValue(formik.values.dob,e.target.value)} disabled={isdisabled} required /></td>
                              <td className='p-1'> <label class="form-label float-end">Marital Status: </label></td>
                              <td className='p-1'><select class="form-select float-start" name='employer_type' id='employer_type' style={{width:'230px'}} defaultValue={formik.values.marital_status} onChange={formik.handleChange} disabled={isdisabled}>
                                <option defaultValue="Single">Single</option>
                                <option defaultValue="Divorced">Divorced</option>
                                <option defaultValue="Married">Married</option>
                                <option defaultValue="Partner">Partner</option>
                                <option defaultValue="Widow">Widow</option>
                                <option defaultValue="Seperated">Seperated</option>
                                <option defaultValue="Widowed">Widowed</option>
                                <option defaultValue="Widower">Widower</option>
                                <option defaultValue="Remarried">Remarried</option>
                                <option defaultValue="Spouse Expired">Spouse Expired</option>

                            </select></td>
                              <td className='p-1'> <label class="form-label float-end">Residential Area</label></td>
                              <td className='p-1'><input type="text"
                                className='form-control float-start'
                                id="trading_name"
                                name="trading_name"
                                style={{width:'230px'}}
                                defaultValue={formik.values.residency_area} required disabled />
                            <a className="p-0 mx-0" type="button" onClick={showAddressModal}>
                                <AiOutlineSearch style={{ padding: '0px' }} size={30} color={'black'} />
                            </a></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                          </tr>
                          <tr>
                          <td className='p-1'><label class="form-label float-end">Age: </label></td>
                              <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="age"
                                    name="age"
                                    style={{width:'230px'}}
                                    defaultValue={formik.values.age} onChange={formik.handleChange} disabled /></td>
                              
                              <td className='p-1'>  <label class="form-label float-end">Phone Number: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="phone_no"
                                name="phone_no"
                                style={{width:'230px'}}
                                defaultValue={formik.values.phone_no} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'> <label class="form-label float-end">Status: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="status"
                                name="status"
                                style={{width:'230px'}}
                                defaultValue={formik.values.status} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                          </tr>
                          <tr>
                          <td className='p-1'> <label class="form-label float-end">Contact Number: </label></td>
                              <td className='p-1'> <input type="text"
                                    className='form-control float-start'
                                    id="contact_no"
                                    name="contact_no"
                                    style={{width:'230px'}}
                                    defaultValue={formik.values.contact_no} onChange={formik.handleChange} disabled={isdisabled} /></td>
                             
                              <td className='p-1'> <label class="form-label float-end">Email: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="email"
                                name="email"
                                style={{width:'230px'}}
                                defaultValue={formik.values.email} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                          </tr>
                          <tr>
                          <td className='p-1'> <label class="form-label float-end">FAX Number: </label></td>
                              <td className='p-1'><input type="text"
                                    className='form-control float-start'
                                    id="fax_no"
                                    name="fax_no"
                                    style={{width:'230px'}}
                                    defaultValue={formik.values.fax_no} onChange={formik.handleChange} disabled={isdisabled} /></td>
                             
                              <td className='p-1'>  <label class="form-label float-end">Date Joined NAPSA: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                name='date_joined_napsa'
                                id='date_joined_napsa'
                                style={{width:'230px'}}
                                defaultValue={formik.values.date_joined_napsa} disabled={isdisabled} /></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                          </tr>
                          <tr>
                          <td className='p-1'> <label class="form-label float-end">Provisional SSN: </label></td>
                              <td className='p-1'><input type="text"
                                    className='form-control float-start'
                                    id="prov_ssn"
                                    name="prov_ssn"
                                    style={{width:'230px'}}
                                    defaultValue={formik.values.prov_ssn} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'>  <label class="form-label float-end">Date Joined Employer: </label></td>
                              <td className='p-1'>  <input type="text"
                                className='form-control float-start h-50'
                                name='date_joined_employer'
                                id='date_joined_employer'
                                style={{width:'230px'}}
                                defaultValue={formik.values.date_joined_employer} disabled={isdisabled} /></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                              <td className='p-1'></td>
                          </tr>
                      </tbody>
                  </table>

                </div>


                <div className="row">
                    <span>
                        <p className='lead fs-6'>Employer Details</p>

                        <hr />
                    </span>
                   <table>
                       <tbody className='fs-6'>
                           <tr>
                               <td className='p-1'> <label class="form-label float-end">Province: </label></td>
                               <td className='p-1'>  <select class="form-select float-start" name='sector_code' id='sector_code'  style={{width:'230px'}} defaultValue={formik.values.sector_code} onChange={formik.handleChange} disabled={isdisabled}>
                                <option defaultValue="LUKASA">LUKASA</option>
                                <option defaultValue="CENTRAL">CENTRAL</option>
                                <option defaultValue="COPPERBELT">COPPERBELT</option>
                                <option defaultValue="NORTHERN">NORTHERN</option>
                                <option defaultValue="EASTERN">EASTERN</option>
                                <option defaultValue="SOUTHERN">SOUTHERN</option>


                            </select></td>
                               <td className='p-1'> <label class="form-label float-end">Processing Center: </label></td>
                               <td className='p-1'><input type="text"
                                className='form-control float-start'
                                name='pros_center'
                                id='pros_center'
                                style={{width:'230px'}}
                                defaultValue={isdisabled?'':formik.values.pros_center} disabled /></td>
                               <td className='p-1'> <label class="form-label float-end">Occupation: </label></td>
                               <td className='p-1'><select class="form-select float-start" name='occupation' id='sector_code'  style={{width:'230px'}} defaultValue={formik.values.occupation} onChange={formik.handleChange} disabled={isdisabled}>
                                <option defaultValue="1111">Legislators</option>
                                <option defaultValue="1112">Senior Govt Officials</option>
                                <option defaultValue="1211">Finance Managers</option>
                                <option defaultValue="1212">Human Resource Managers</option>
                                <option defaultValue="1213">Policy and Planning Managers</option>

                            </select></td>
                               <td className='p-1'></td>
                               <td className='p-1'></td>
                           </tr>
                       </tbody>
                   </table>

                </div>

                <div className="row">
                    <span>
                        <p className='lead fs-6'>Parents Details</p>

                        <hr />
                    </span>
                  <table>
                      <tbody className='fs-6'>
                          <tr>
                              <td className='p-1'><label class="form-label float-end">Fathers Surname: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="father_surname"
                                name="father_surname"
                                style={{width:'230px'}}
                                defaultValue={formik.values.father_surname} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'>  <label class="form-label float-end">Fathers Othername: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="father_othername"
                                name="father_othername"
                                style={{width:'230px'}}
                                defaultValue={formik.values.father_othername} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'>  <label class="form-label float-end">Mothers Surname: </label></td>
                              <td className='p-1'><input type="text"
                                className='form-control float-start'
                                id="mother_surname"
                                name="mother_surname"
                                style={{width:'230px'}}
                                defaultValue={formik.values.mother_surname} onChange={formik.handleChange} disabled={isdisabled} /></td>
                              <td className='p-1'> <label class="form-label float-end">Mothers Othername: </label></td>
                              <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="mother_othername"
                                name="mother_othername"
                                style={{width:'230px'}}
                                defaultValue={formik.values.mother_othername} onChange={formik.handleChange} disabled={isdisabled} /></td>
                          </tr>
                      </tbody>
                  </table>
                </div>
                <Modal title="Add Benficiary" visible={isAddbenf} onOk={AddBenfhandleOk} onCancel={AddBenfhandleCancel}>
                <table>
                    <tbody className='fs-6'>
                        <tr>
                            <td className='p-1'> <label class="form-label float-end">Status: </label></td>
                            <td className='p-1'><input type="text"
                                className='form-control float-start'
                                id="benf_status"
                                name="benf_status"
                                style={{width:'230px'}}
                                defaultValue={"Open"} disabled/></td>
                        </tr>
                        <tr>
                            <td className='p-1'> <label class="form-label float-end">NRC No: </label></td>
                            <td className='p-1'><input type="text"
                                className='form-control float-start'
                                id="benf_nrc"
                                name="benf_nrc"
                                style={{width:'230px'}}
                                defaultValue={formik.values.benf_nrc} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        </tr>
                        <tr>
                            <td className='p-1'><label class="form-label float-end">Relationship Code: </label></td>
                            <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="benf_rel_code"
                                name="benf_rel_code"
                                style={{width:'230px'}}
                                defaultValue={formik.values.benf_rel_code} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        </tr>
                        <tr>
                            <td className='p-1'> <label class="form-label float-end">Relationship Value: </label></td>
                            <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="benf_rel_val"
                                name="benf_rel_val"
                                style={{width:'230px'}}
                                defaultValue={formik.values.benf_rel_val} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        </tr>
                        <tr>
                            <td className='p-1'> <label class="form-label float-end">Surname: </label></td>
                            <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="benf_surname"
                                name="benf_surname"
                                style={{width:'230px'}}
                                defaultValue={formik.values.benf_surname} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        </tr>
                        <tr>
                            <td className='p-1'><label class="form-label float-end">Othername: </label></td>
                            <td className='p-1'> <input type="text"
                                className='form-control float-start'
                                id="benf_othername"
                                name="benf_othername"
                                style={{width:'230px'}}
                                defaultValue={formik.values.benf_othername} onChange={formik.handleChange} disabled={isdisabled} /></td>
                        </tr>
                        <tr>
                            <td className='p-1'>  <label class="form-label float-end">Date of Birth: </label></td>
                            <td> <input class='form-control' type='date' name='benf_dob' id='benf_dob' defaultValue={new Date()} onChange={(e) => formik.setFieldValue("benf_dob",formatDate(e.target.valueAsDate.toUTCString()))} /></td>
                        </tr>
                        
                    </tbody>
                </table>
                </Modal>
                <div className="row mt-5 pb-5">
                    <span>
                        <p className='lead fs-6'>Beneficiaries   <button type="button" className="btn btn-danger float-end rounded-pill mx-3 mb-3" onClick={() => { setisAddbenf(true) }}>+ Add</button></p>

                        <hr />
                    </span>
                    <div className="col p-3">
                        <table class="table p-3">
                            <thead className='fs-6'>
                                <tr>
                                    <th scope="col">Status</th>
                                    <th scope="col">NRC NO</th>
                                    <th scope="col">Relationship code</th>
                                    <th scope="col">Relationship Value</th>
                                    <th scope="col">Surname</th>
                                    <th scope="col">Othername</th>
                                    <th scope="col">Date Of Birth</th>
                                </tr>
                            </thead>
                            <tbody className='fs-6'>
                                {
                                    benf_row_data && benf_row_data.map((key,i)=>(
                                    <tr key={key}>
                                        <td className='p-1'>{"Open"}</td>
                                        <td className='p-1'>{key.benf_nrc} </td>
                                        <td className='p-1'>{key.benf_rel_code}</td>
                                        <td className='p-1'>{key.benf_rel_val}</td>
                                        <td className='p-1'>{key.benf_surname}</td>
                                        <td className='p-1'>{key.benf_othername}</td>
                                        <td className='p-1'>{key.benf_dob}</td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
                <Tabs onChange={callback} defaultActiveKey='1' type="card">
                    <TabPane tab="Actions/Attachments" key="1">
                        <div className='row'>
                            <span>
                                <p className='lead fs-6'>Activities</p>

                                <hr />
                            </span>
                            <div className='col px-5'>
                                <Activities emp={reg_sr_values?reg_sr_values.employer_id:''}/>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Documents" key="2">

                    </TabPane>
                    <TabPane tab="Collections" key="3">

                    </TabPane>
                </Tabs>
            </form>
        </div>
    )
}

export default Member_registration
