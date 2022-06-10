import { React, useState } from 'react';
import { useFormik ,Field,FormikProvider} from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { register_sr_member } from '../../redux/actions/SRAction';
import { t_date } from '../../utils/commons'
import { AiOutlineSearch } from "react-icons/ai";
function Member_register() {
    const [isnewEntry, setIsnewEntry] = useState(true)
    const [srNum, setSrId] = useState('')
      const [empNumb, setEmpNumb] = useState('')
      const [empName, setEmpNum] = useState('')
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
            nrc:'',
            date_received: isnewEntry?'':t_date().year + '-' + t_date().month + '-' + t_date().date,
            contact_nam: '',
            contact_num: '',
            employer_id: empNumb,
            employer_name: empName,
            nationality: '',
            surname: '',
            othernames: '',
            owner_name: '',
            owner_id: userdata.id,
            notes: '',
        

        },
        enableReinitialize: true,

        onSubmit: values => {
            dispatch(register_sr_member(values))
        },
        onChange: values => {
            console.log(values)
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

        setsrType('Member Registration')
        setstatus('Open')
        setIsnewEntry(false)
    }

    const searchemployer = (e) => {
        e.preventDefault();
        setEmpNumb(formik.values.employer_id)
        console.log(formik.values.employer_id)
        axios.get("http://localhost:8080/app/getCompanyById/" + formik.values.employer_id).then(
            (res) => (
        
               setEmpNum(res.data.name)

            )
        )
    }

    return (
        <div className="p-3">
            <div className='row'>
                <div className="">
                    <div className="">
                    <p className="card-title fs-3 mb-3">Member Registration</p>
                        <button type="button"  class="btn btn-danger float-end rounded-pill" style={{ width: "150px" }} onClick={(handlenewentry)}>+ Add</button>
                    </div>

                    <FormikProvider value={formik}>
                    <form className='form' onSubmit={formik.handleSubmit}>

                    <table>
                            <tbody className='fs-6'>
                                <tr >
                                    <td className='p-1'><label className='form-label float-end'>Sr #: </label></td>
                                    <td className='p-1'>  <input type="text"
                                        className='form-control float-start '
                                        id="sr_num"
                                        name="sr_num"
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.sr_num} onChange={formik.handleChange} disabled /></td>
                                    <td className='p-1'> <label class="form-label float-end">Nationality: </label></td>
                                   
                                   <td>
                                   <Field component="select" name='nationality' id='nationality' value={formik.values.nationality} className={"form-control float-start"} style={{ width: '230px' }}  onChange={ formik.handleChange } required disabled={isnewEntry}>
                              
                                            <option defaultValue=""></option>
                                            <option defaultValue="Zambian">Zambian</option>
                                            <option defaultValue="Foreigner">Foreigner</option>
                                            
                                      
                                        </Field>
                                  </td> 
                                    <td className='p-1'><label className='form-label float-end'>Owner: </label></td>
                                    <td className='p-1'>  <input type="text"
                                        className='form-control float-start '
                                        name="owner_name"
                                        id="owner_name"
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.owner_name} placeholder="Owner name" onChange={formik.handleChange} required disabled={isnewEntry} />
                                    </td>

                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>SR Type: </label></td>
                                    <td className='p-1'>   <select class="form-control float-start " style={{ width: '230px' }} onChange={formik.handleChange} disabled>
                                        <option defaultValue={formik.values.sr_type}>{formik.values.sr_type}</option>

                                    </select>
                                    </td>
                                    <td className='p-1'><label className='form-label float-end'>Employer #: </label></td>
                                    <td className='p-1'><input type="text"
                                            className='form-control float-start '
                                            name='employer_id'
                                            id="employer_id"
                                            style={{ width: '230px' }}
                                            defaultValue={formik.values.employer_id} onChange={formik.handleChange} disabled={isnewEntry}/>
                                            <a className="p-0 mx-0" type="button" onClick={searchemployer}>
                                        <AiOutlineSearch style={{ margin: '5px', overflow: 'auto' }} size={30} color={'black'} />
                                    </a>
                                            </td>
                                    <td className='p-1'><label className='form-label float-end'>Notes: </label></td>
                                    <td className='p-1'>  <textarea class="form-control float-start " placeholder="Notes" id="notes" name="notes" defaultValue={formik.values.notes} onChange={formik.handleChange} disabled={isnewEntry}></textarea></td>


                                </tr>
                                <tr>
                                <td className='p-1'><label className='form-label float-end'>Status: </label></td>
                                    <td className='p-1'> <select class="form-select mx-auto "  style={{ width: '230px' }} onChange={formik.handleChange} disabled>
                                            <option defaultValue={formik.values.status}>{formik.values.status}</option>
                                           
                                        </select></td>
                                   
                                        <td className='p-1'><label class="form-label float-end">Employer Name: </label></td>
                                    <td className='p-1'><input type="text"
                                        className='form-control float-start'
                                        name='employer_name'
                                        id='employer_name'
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.employer_name} onChange={formik.handleChange} disabled={isnewEntry} required /></td>
                                   
                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Owner Type: </label></td>
                                    <td className='p-1'> 
                                    <Field component="select" class="form-select float-start "  style={{ width: '230px' }} id="owner_type" name="owner_type" onChange={formik.handleChange} disabled={isnewEntry}>
                                            <option defaultValue=""></option>
                                            <option defaultValue="Customer Service Clerk">Customer Service Clerk</option>
                                            <option defaultValue="Station Head">Station Head</option>
                                            
                                        </Field></td>
                                        <td className='p-1'>   <label class="form-label float-end">NRC NO: </label></td>
                                    <td className='p-1'>
                                 
                                        <input type="text"
                                            className='form-control float-start '
                                            name='nrc'
                                            id='nrc'
                                            style={{width:'230px'}}
                                            defaultValue={formik.values.nrc} onChange={formik.handleChange} disabled={isnewEntry}/>
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
                                   <td className='p-1'><label className='form-label float-end'>Surname Name: </label></td>
                                    <td className='p-1'> <input type="text"
                                        className='form-control float-start'
                                        name='surname'
                                        id='surname'
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.surname} onChange={formik.handleChange} disabled={isnewEntry} required /></td>

                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Contact Name: </label></td>
                                    <td className='p-1'> <input type="text"
                                            className='form-control float-start '
                                            name='contact_name'
                                            id='contact_name'
                                            style={{ width: '230px' }}
                                            defaultValue={formik.values.contact_name} onChange={formik.handleChange} disabled={isnewEntry}/></td>
                                    <td className='p-1'><label className='form-label float-end'>Other Name: </label></td>
                                    <td className='p-1'>  <input type="text"
                                        className='form-control float-start'
                                        name='othernames'
                                        id='othernames'
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.othernames} onChange={formik.handleChange} disabled={isnewEntry} required /></td>
                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Contact Mobile #: </label></td>
                                    <td className='p-1'>  <input type="text"
                                            className='form-control float-start '
                                            name='contact_no'
                                            id='contact_no'
                                            style={{ width: '230px' }}
                                            defaultValue={formik.values.contact_no} onChange={formik.handleChange} disabled={isnewEntry}/></td>
                              
                                </tr>
                                <tr>
                                <td className='p-1'>
                                        
                                        </td>
                                        <td className='p-1'>
                                        
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

export default Member_register
