import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik,Field,FormikProvider } from 'formik';
import axios from 'axios'

import { register_sr_employer } from '../../redux/actions/SRAction';
import { t_date } from '../../utils/commons'
import { Redirect } from "react-router-dom"

function Employer_register() {

    const [isDisable, setIsDisable] = useState(true)
    const [srNum, setSrId] = useState('')
    const [srType, setsrType] = useState('')
    const [status, setstatus] = useState('')
    const [date_received, setDate_received] = useState('')
    const dispatch = useDispatch();

    const userdata = useSelector(state => state.AuthReducer).user;

    const formik = useFormik({
        initialValues: {
            sr_num: srNum,
            sr_type: srType,
            status: status,
            owner_type: '',
            date_received: isDisable?'':t_date().year + '-' + t_date().month + '-' + t_date().date,
            contact_name: '',
            contact_no: '',
            employer_id: '',
            employer_name: '',
            employer_type: '',
            nationality: '',
            nrc: '',
            prop_firstname: '',
            prop_lastname: '',
            prop_position: '',
            owner_name: '',
            owner_id: userdata.id,
            notes: '',

        },
        enableReinitialize: true,
        onSubmit: values => {
            dispatch(register_sr_employer(values))
            return <Redirect to='/dashboard/employer'/>
        },
        onChange: values => {
            formik.setValues(values)
        }
    })
    const handlenewentry = (e) => {
        e.preventDefault();
        axios.get("http://localhost:8080/app/getNewServiceRequest").then(
            (res) => (
                setSrId(res.data.srNumber)

            )
        )

        setsrType('Employer registration')
        setstatus('Open')
        setIsDisable(false)
    }



    return (
        <div className="">
            <div className='row p-3'>
                <div className="">
                    <div className="">
                        <p className="card-title fs-3 mb-3">Employer Registration</p>
                        <button type="button" className="btn btn-danger float-end rounded-pill" onClick={(handlenewentry)}>+ Add</button>
                    </div>

                    <FormikProvider value={formik}>
                    <form className='form' onSubmit={formik.handleSubmit}>
                        <table>
                            <tbody className='fs-6'>
                                <tr >
                                    <td className=''><label className='form-label float-end'>Sr #: </label></td>
                                    <td className='p-1'>  <input type="text"
                                        className='form-control float-start '
                                        id="sr_num"
                                        name="sr_num"
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.sr_num} onChange={formik.handleChange} disabled /></td>
                                    <td className='p-1'><label className='form-label float-end'>Employer Type: </label></td>
                                    <td className='p-1'>   
                                    <Field component="select" name='employer_type' id='employer_type' defaultValue={formik.values.sr_type} className={"form-control float-start"} style={{ width: '230px' }}  onChange={ formik.handleChange } disabled={isDisable}>
                                    
                                        <option defaultValue=""></option>
                                        <option defaultValue="Domestic Employer">Domestic Employer</option>
                                        <option defaultValue="Business Name">Business Name</option>
                                        <option defaultValue="Limited Company">Limited Company</option>
                                        <option defaultValue="ROS employer">ROS employer</option>
                                        <option defaultValue="Statutory">Statutory</option>

               
                                    </Field>
                                    </td>
                                    <td className='p-1'><label className='form-label float-end'>Owner: </label></td>
                                    <td className='p-1'>  <input type="text"
                                        className='form-control float-start '
                                        name="owner_name"
                                        id="owner_name"
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.owner_name} placeholder="Owner name" onChange={formik.handleChange} required disabled={isDisable} />
                                    </td>

                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>SR Type: </label></td>
                                    <td className='p-1'>   
                                    <Field component="select" id="sr_type" name="sr_type" defaultValue={formik.values.sr_type} className={"form-control float-start"} style={{ width: '230px' }}  onChange={ formik.handleChange } disabled>
                                        <option value=' '></option>
                                        <option value='Employer registration'>Employer registration</option>
                                        <option value='Employer registration'>Member registration</option>

                                    </Field>
                                    </td>
                                    <td className='p-1'><label className='form-label float-end'>Employer Name: </label></td>
                                    <td className='p-1'>                                         <input type="text"
                                        className='form-control float-start '
                                        name='employer_name'
                                        id='employer_name'
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.employer_name} onChange={formik.handleChange} disabled={isDisable} required />
                                    </td>
                                    <td className='p-1'><label className='form-label float-end'>Notes: </label></td>
                                    <td className='p-1'>  <textarea class="form-control float-start " placeholder="Notes" id="notes" name="notes" defaultValue={formik.values.notes} onChange={formik.handleChange} disabled={isDisable}></textarea></td>


                                </tr>
                                <tr>
                                <td className='p-1'><label className='form-label float-end'>Status: </label></td>
                                    <td className='p-1'> <select class="form-select mx-auto "  style={{ width: '230px' }} onChange={formik.handleChange} disabled>
                                            <option defaultValue={formik.values.status}>{formik.values.status}</option>
                                           
                                        </select></td>
                                   
                                    <td className='p-1'><label className='form-label float-end'>Employer #: </label></td>
                                    <td className='p-1'><input type="text"
                                            className='form-control float-start '
                                            name='employer_id'
                                            id="employer_id"
                                            style={{ width: '230px' }}
                                            defaultValue={formik.values.employer_id} onChange={formik.handleChange} disabled/></td>
                                   
                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Owner Type: </label></td>
                                    <td className='p-1'> 
                                    
                                    <Field component="select" class="form-select float-start "  style={{ width: '230px' }} id="owner_type" name="owner_type" onChange={formik.handleChange} disabled={isDisable}>
                                            <option defaultValue=""></option>
                                            <option defaultValue="Customer Service Clerk">Customer Service Clerk</option>
                                            <option defaultValue="Station Head">Station Head</option>
                                            
                                        </Field></td>
                                    <td className='p-1'> <label class="form-label float-end">Nationality: </label></td>
                                   
                                       <td>
                                       <Field component="select" name='nationality' id='nationality' value={formik.values.nationality} className={"form-control float-start"} style={{ width: '230px' }}  onChange={ formik.handleChange } required disabled={isDisable}>
                              
                                            <option defaultValue=""></option>
                                            <option defaultValue="Zambian">Zambian</option>
                                            <option defaultValue="Foreigner">Foreigner</option>
                                            
                                      
                                        </Field>
                                      </td> 
                                      <td className='p-1'></td>
                                      <td>   <button type="submit" className="btn btn-danger float-start rounded-pill">Proceed</button></td>
                                </tr>
                                <tr>
                                <td className='p-1'><label className='form-label float-end'>Date Received: </label></td>
                                    <td className='p-1'> <input type="text"
                                        className='form-control float-start '
                                        name='date_received'
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.date_received} disabled /></td>
                                   <td className='p-1'>   <label class="form-label float-end">NRC NO: </label></td>
                                    <td className='p-1'>
                                 
                                        <input type="text"
                                            className='form-control float-start '
                                            name='nrc'
                                            id='nrc'
                                            style={{width:'230px'}}
                                            defaultValue={formik.values.nrc} onChange={formik.handleChange} disabled={isDisable}/>
                                    </td>

                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Contact Name: </label></td>
                                    <td className='p-1'> <input type="text"
                                            className='form-control float-start '
                                            name='contact_name'
                                            id='contact_name'
                                            style={{ width: '230px' }}
                                            defaultValue={formik.values.contact_name} onChange={formik.handleChange} disabled={isDisable}/></td>
                                    <td className='p-1'>
                                    <label class="form-label float-end">Properietor First Name: </label>
                                       
                                    </td>
                                    <td className='p-1'>
                                    <input type="text"
                                            className='form-control float-start'
                                            name='prop_firstname'
                                            id='prop_firstname'
                                            style={{width:'230px'}}
                                            defaultValue={formik.values.prop_firstname} onChange={formik.handleChange} disabled={isDisable}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Contact Mobile #: </label></td>
                                    <td className='p-1'>  <input type="text"
                                            className='form-control float-start '
                                            name='contact_no'
                                            id='contact_no'
                                            style={{ width: '230px' }}
                                            defaultValue={formik.values.contact_no} onChange={formik.handleChange} disabled={isDisable}/></td>
                                <td className='p-1'>
                                    <label class="form-label float-end">Properietor Last Name: </label>
                                       
                                    </td >
                                    <td className='p-1'>
                                    <input type="text"
                                            className='form-control float-start'
                                            name='prop_lastname'
                                            id='prop_lastname'
                                            style={{width:'230px'}}
                                            defaultValue={formik.values.prop_lastname} onChange={formik.handleChange} disabled={isDisable}/>
                                    </td>
                                </tr>
                                <tr>
                                <td className='p-1'>
                                        
                                        </td>
                                        <td className='p-1'>
                                        
                                        </td>
                                        <td>
                                    <label class="form-label float-end">Properietor Location: </label>
                                       
                                    </td>
                                    <td className='p-1'>
                                    <input type="text"
                                            className='form-control float-start'
                                            name='prop_position'
                                            id='prop_position'
                                            style={{width:'230px'}}
                                            defaultValue={formik.values.prop_position} onChange={formik.handleChange} disabled={isDisable}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                    </form>
                    </FormikProvider>


                </div>
            </div>

        </div>
    )
}

export default Employer_register
