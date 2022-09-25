import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {  useHistory } from "react-router-dom";

import { API_URL, formatDate, setSrRegistration, set_employ_registration, submitMemberServiceRequest, t_date } from '../../utils/commons'

import Employer_registration from '../Employer/employer_registeration';
import '../../App.css';

import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from 'antd';
import { SearchOutlined } from '@material-ui/icons';
import MemberRegistration from '../Members/MemberRegistration';
import { AiOutlineSearch } from 'react-icons/ai';
const _ = require('lodash')

function ServiceMemberRegistration(props) {

    const [isDisable,setIsDisable] = useState(true)
    const [srForm,setSrForm] = useState({})
    const [lookUp,setLookUp] = useState(null)
    const [employer_number,setEmployer_Number] = useState('')
    const [viewMemberPanel, setViewMemberPanel] = useState(false)
   
    let history = useHistory(); 
    const schema = yup.object().shape({
        contact_no : yup.string().min(10),
        contact_mail : yup.string().email()
    })

    const submitServiceRequest = (sr_values,userId)=>{
        console.log(submitMemberServiceRequest(sr_values,userId))
        setEmployer_Number(getValues("employer_id"))
        axios.post(API_URL+'/saveCompanyMemberServiceRequest',submitMemberServiceRequest(sr_values,userId)).
        then((res)=>{

            //setEmployer_Number(res.data.companyVo.id)
           // setValue("employer_id",res.data.companyVo.id)
            setSrForm(res.data.serviceRequestVo)
            console.log(res.data)
            setViewMemberPanel(true)
            alert("Service request created successfully!!")
        }).catch((err)=>{
            alert("Failed to create Service Request!!")
        })
}


    const userdata = useSelector(state => state.AuthReducer).user;

    const initialValues = {
    
        sr_num:'',
        id:'',
        sr_type:'',
        sr_type:  'Member Registration',
        status: '',
        owner_type: '',
        date_received:'',
        contact_name:'',
        contact_mail:'',
        contact_no:'',
        employer_id: '',
        employer_name:'',
        employer_type:'',
        nationality: '',
        nrc: '',
        location:'',
        owner_name:'',
        owner_id: userdata.id,
        notes:'',
    }

    const { register, handleSubmit,getValues,watch, formState: { errors } ,setValue} = useForm(
        { resolver: yupResolver(schema), defaultValues:initialValues }
    );

    const onSubmitSR = data =>{
        console.log(data)
        setIsDisable(true)
        submitServiceRequest(data,userdata.id)
    }

    const handlenewentry = (e) => {
        e.preventDefault();
    
        axios.get(API_URL + "/getNewServiceRequest").then(
            (res) => (
                //setSrId(res.data.srNumber),
                setValue('sr_num', res.data.srNumber),
                setValue('owner_name',userdata.lastName)
            )
        )
        setIsDisable(false)
            }
    
    const handleResetForm = () => {
        history.push("/dashboard/service?type=MR");
      };

      const findEmployer = ()=>{
        axios.get(API_URL + "/getCompanyById/"+getValues('employer_id'))
        .then((res)=>{
            console.log(res.data)
            setMemberFormValues(res.data)
        })
      }

      const setMemberFormValues = (data)=>{
        setValue('employer_name',data.name)
        setValue('status',data.companyStatus)
        setValue('date_received',formatDate(data.created))
        setValue('owner_type',data.name)
        
      }

      useEffect(()=>{
        axios.get(API_URL + '/getLookUpForEmployer').then(
            (res) => {
                setLookUp(res.data)
               
            })
            if(props.id){
                axios.get(API_URL + '/serviceRequestBySrNumber/'+props.id).then(
                (res) => {
                    console.log(res.data)
                    setSrForm(res.data)
                    setEmployer_Number(res.data.companyVo.id)
                    setSRFormData(res.data)
                    setViewMemberPanel(true)
                   
                } 
            )}
            
      },[])

      const setSRFormData = (data)=>{
        console.log(data)
        setValue("id",data.serviceRequestVo.id)
        setValue("sr_num",data.serviceRequestVo.srNumber)
        setValue("sr_type",data.serviceRequestVo.type)
        setValue("status",data.serviceRequestVo.status)
       // setValue("owner_type",data.serviceRequestVo.srNumber)
        setValue("date_received",formatDate(data.serviceRequestVo.created))
        setValue("contact_name",data.serviceRequestVo.contactName)
        setValue("contact_no",data.serviceRequestVo.contactNumber)
        setValue("contact_mail",data.serviceRequestVo.contactEmail)
        setValue("employer_id",data.companyVo.id)
        setValue("employer_name",data.companyVo.name)
        setValue("employer_type",data.companyVo.companyType)
        setValue("nationality",data.serviceRequestVo.propiterNationality)
        setValue("location",data.serviceRequestVo.location)
        setValue("nrc",data.serviceRequestVo.proprietorNRC)
        setValue("prop_firstname",data.serviceRequestVo.srPropiterFirstName)
        setValue("prop_lastname",data.serviceRequestVo.srPropiterLastName)
        setValue("owner_name",data.serviceRequestVo.user.position.name)
        setValue("owner_type",data.serviceRequestVo.user.position.positionType)
        setValue("owner_id",data.serviceRequestVo.user.id)
        setValue("notes",data.serviceRequestVo.comments)
    }

    return (
       <>
        <div className="p-2">
          
          <form className='form' onSubmit={handleSubmit(onSubmitSR)}>
              <div className='row p-1'>
                  <div class="card py-3">
                      <div class="card-body">
                      {Object.keys(errors).map((key)=>(
                           <span className='p-1' key={key}><Alert message={errors[key].message} type="error" showIcon />
                          
                           </span>
                           
                          ))}

                          <table className="float-end">

                              <td className="p-3"> <button type="button" className="btn btn-danger float-start rounded-pill" onClick={(handlenewentry)}>+ Add</button></td>
                              <td className="p-3"> <button type="reset" className="btn btn-danger float-start rounded-pill" onClick={(handleResetForm)}>Cancel</button></td>
                              <td className="p-3">     <button type="submit" className="btn btn-danger float-start rounded-pill">Proceed</button></td>
                          </table>

                        


                      </div>

             
                      <div class="row">
                          <div className="font-weight-bolder col ">
                              <h4 className="lead text-center"> Service Request Details </h4>
                          </div>
                          <div class="col">
                              <h4 className="lead  text-center"> Member Employer Details </h4>
                          </div>
                          <div class="col">

                          </div>
                          <div class="col">
                              <h4 className="lead  text-center"> Contact Details </h4>
                          </div>
                      </div>
                     

                      <table className=''>
                          <tbody className='fs-6'>

                              <tr>
                                  <td className='tcx-form-label'><label className='form-label float-end'>Sr #: </label></td>
                                  <td className='p-1'>  <input type="text"
                                      className='form-control float-start '
                                      id="sr_num"
                                      name="sr_num"
                                      style={{ width: '100%' }}
                                      defaultValue={initialValues.sr_num} {...register("sr_num")} disabled /></td>
                                  <td className='tcx-form-label'><label className='form-label float-end'>Employer Name: </label></td>
                                  <td className='' colSpan={3}>
                                      <input type="text"
                                          className='form-control float-start '
                                          name='employer_name'
                                          id='employer_name'
                                          style={{ width: '100%' }}
                                          defaultValue={initialValues.employer_name.toUpperCase()} {...register("employer_name")} onChange={(e)=> setValue("employer_name",e.target.value.toUpperCase())} disabled={isDisable} required />
                                  </td>
                               
                                  <td className='p-1 tcx-form-label'><label className='form-label float-end'>Contact Name: </label></td>
                                  <td className='p-1'> <input type="text"
                                      className='form-control float-start '
                                      name='contact_name'
                                      id='contact_name'
                                      style={{ width: '100%' }}
                                      defaultValue={initialValues.contact_name}  {...register("contact_name")} disabled={isDisable} />
                                  </td>


                              </tr>
                              <tr>
                                          <td className='tcx-form-label'><label className='form-label float-end'>Status: </label></td>
                                  <td className='p-1'> <select class="form-select" id="status" style={{ width: '100%' }} {...register("status")} disabled>
                                         
                                          { lookUp ? lookUp.TCX_STATUS.map((item)=>(
                                             <option defaultValue={item} key={item} >{item}</option>  
                                          )):null
                                      }
                                       


                                  </select></td>
                                  <td className='p-1 tcx-form-label' ><label className='form-label float-end'>Employer #: </label></td>
                                  <td className='p-1' style={{display:'flex'}}><input type="text"
                                      className='form-control float-start '
                                      name='employer_id'
                                      id="employer_id"
                                      style={{ width: '100%' }}
                                      defaultValue={initialValues.employer_id}  {...register("employer_id")}  disabled={isDisable} />
                                     <a type='button' className="px-2" onClick={findEmployer}> 
                                     <AiOutlineSearch style={{ margin: '5px', overflow: 'auto' }} size={30} color={'black'} /> </a>
                                      </td>
                                  
                                  <td className='p-1 tcx-form-label'>
                                     

                                  </td>
                                  <td className='p-1'>
                                     
                                  </td>
                                  <td className='p-1 tcx-form-label'><label className='form-label float-end'>Contact Mobile #: </label></td>
                                  <td className='p-1'>  <input type="number"
                                      className='form-control float-start '
                                      name='contactNumber'
                                      id='contact_no'
                                      style={{ width: '100%' }}
                                      defaultValue={initialValues.contact_no}  {...register("contact_no")}  disabled={isDisable} /></td>

                              </tr>
                              <tr>
                              <td className='p-1 tcx-form-label'><label className='form-label float-end'>Date Received: </label></td>
                                  <td className='p-1'> <input type="text"
                                      className='form-control float-start '
                                      name='date_received'
                                      style={{ width: '100%' }}
                                      defaultValue={initialValues.date_received}  {...register("date_received")}  disabled /></td>
                                  <td className='p-1 tcx-form-label'></td>
                                  <td className='p-1'></td>
                                       
                                       <td className='p-1 tcx-form-label'>
                                    

                                  </td >
                                  <td className='p-1'>
                                    
                                  </td>
                                 
                                  <td className='p-1 tcx-form-label'><label className='form-label float-end'>Contact Email: </label></td>
                                  <td className='p-1'> <input type="text"
                                      className='form-control float-start '
                                      name='contactEmail'
                                      id='contact_mail'
                                      style={{ width: '100%' }}
                                      defaultValue={initialValues.contact_mail}  {...register("contact_mail")}  disabled={isDisable} />
                                  </td>

                              </tr>
                              <tr>
                                  <td className='p-1 tcx-form-label'><label className='form-label float-end'>Owner Type: </label></td>
                                  <td className='p-1'>

                                      <select class="form-select float-start " style={{ width: '100%' }} id="owner_type" name="owner_type" defaultChecked={initialValues.owner_type} {...register("owner_type")}  disabled>
                                      
                                          { lookUp ? lookUp.TCX_OWNER_TYPE.map((item)=>(
                                             <option defaultValue={item} key={item}>{item}</option>  
                                          )):null
                                      }
                                     

                                      </select></td>
                                      <td className='tcx-form-label'>
                                      

                                  </td>
                                  <td className='p-1'>
                                     
                                  </td>
                                  
                                  <td className='p-1 tcx-form-label'> </td>

                                  <td className='p-1'>  
                                  </td>
                                
                                  <td className='p-1 tcx-form-label'><label className='form-label float-end'>Notes: </label></td>
                                  <td className='p-1 align-top' rowSpan={2}>  <textarea class="form-control float-start h-100" placeholder="Notes" id="notes" name="notes" defaultValue={initialValues.notes}  {...register("notes")}  disabled={isDisable}></textarea></td>
                            

                              </tr>
                              <tr>
                              <td className='p-1 tcx-form-label'><label className='form-label float-end'>Owner: </label></td>
                                  <td className='p-1'>  <input type="text"
                                      className='form-control float-start '
                                      name="owner_name"
                                      id="owner_name"
                                      style={{ width: '100%' }}
                                      defaultValue={initialValues.owner_name} placeholder="Owner name"  {...register("owner_name")} disabled/>
                                  </td>
                                  <td className='p-1 tcx-form-label'></td>
                                      <td className='p-1 tcx-form-label'></td>
                                  <td className='p-1 tcx-form-label'>  </td>
                                  <td className='p-1'>

                                      
                                  </td>
                             
                                    </tr>
                             
                           
                          </tbody>
                      </table>





                  </div>
              </div>
              {viewMemberPanel ? <MemberRegistration id={employer_number} srFormData={srForm} lookUp={lookUp}/> : null}
          </form>
      {/* </FormikProvider> */}
  </div>
       </>
    );
}

export default ServiceMemberRegistration;