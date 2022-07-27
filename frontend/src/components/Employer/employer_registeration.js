import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik, Field, FormikProvider } from 'formik'
import { set_tab_active } from '../../redux/actions/UserBehaviourAction';
import { AiOutlineSearch } from "react-icons/ai";
import { Modal, Button } from 'antd';
import { t_date, set_employ_registration, API_URL, submitServiceRequestEmployerData, formatDatePicker } from '../../utils/commons'
import axios from 'axios';
import 'antd/dist/antd.css';
import { formatDate, set_employ_save } from '../../utils/commons'
import { Tabs } from 'antd';
import Activities from './activities';
import { _ } from 'lodash'
import ChecklistUpload from './checklistUpload';


import Contacts from './contacts';
import Address from './address';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from 'antd';



function Employer_registration(props) {
    const [emp_no, setemp_no] = useState(props.id)
    const lookUp = props.lookUp
    const reg_sr_values = useSelector(state => state.SRReducer).reg_sr_employer;

    const [isdisabled, setisdisabled] = useState(reg_sr_values ? false : true)
    const [companyData, setCompanyData] = useState({})

    const { TabPane } = Tabs;
    const [srForm, setSrForm] = useState(props.srFormData)
    const _ = require("lodash");
    let history = useHistory(); 

    const schema = yup.object().shape({
        contact_no : yup.string().min(10),
        contact_mail : yup.string().email()
    })

    const userdata = useSelector(state => state.AuthReducer).user;

    const { register, handleSubmit, watch, formState: { errors } ,setValue} = useForm(
        { resolver: yupResolver(schema) }
    );

    const onSubmitSRE = data =>{
        console.log(data)
       submitServiceRequestEmployer(data,userdata.id,srForm.id)
    }

    const submitServiceRequestEmployer = (data,userId,srId)=>{
        axios.post(API_URL+'/saveCompanyDetails',submitServiceRequestEmployerData(data,userId,srId,srForm)).
        then((res)=>{
            setCompanyData(res.data)
           getCompanyDetails()
            //setCompanyFormData(res.data)
            // setValue("employer_id",res.data.companyVo.id)
            alert("Service request saved successfully!!")
        }).catch((err)=>{
            console.log(err)
            alert("Failed to save Service Request!!")
        })
    }

    useEffect(() => {
        if (emp_no) {
            setisdisabled(false)
            getCompanyDetails()
        }
    }, [])


    const sendForApprovalSR = (srId)=>{

        axios.put(API_URL + "/sendForApproval/" + srId).then(
            (res) => (
                console.log(res.data),
                alert("Sent for approval"),
                history.push("/dashboard/home")
              
            ))
    }

    const sendForAccept = ()=>{
        axios.put(API_URL + "/approveSrRequest/" + srForm.serviceRequestVo.id).then(
            (res) => (
                console.log(res.data),
                alert("Service Request Accepted"),
                history.push("/dashboard/home")
            ))
    }


    const getCompanyDetails = () => {
        axios.get(API_URL + "/getCompanyById/" + emp_no).then(
            (res) => (
                console.log(res.data),
                setCompanyData(res.data),
                setCompanyFormData(res.data)
          
                //setemp_name(res.data.name),
                //setdate_rec(formatDate(res.data.companyRegDate)),
                //setcity(res.data.address ? res.data.address.city : ''),
                //setpostal_Code(res.data.address ? res.data.address.postal_Code : ''),
                //setState(res.data.address ? res.data.address.state : 'NA'),
                //setarea(res.data.address ? res.data.address.adressLine1 : '')

            ))
    }

const setCompanyFormData = (companyData)=>{
    setValue('srId', srForm.id)
    setValue('companyName', companyData.id ? companyData.name : '')
    setValue('companyNumber', companyData.id ? companyData.id : '')
    setValue('legalName', companyData.id ? companyData.legalName : '')
    setValue('adressLine1', companyData.address ? companyData.address.adressLine1 + ', '+companyData.address.adressLine2+', '+companyData.address.city+', '+companyData.address.state+', '+companyData.address.country+ ', '+companyData.address.postalCode: '')
    setValue('companyStatus', companyData.companyStatus ? companyData.companyStatus : '')
    setValue('companySubStatus', companyData.companySubStatus ? companyData.companySubStatus : '')
    setValue('postalCode', companyData.address ? companyData.address.postalCode : '')
    setValue('legalName', companyData.legalName)
    setValue('companyType', companyData.companyType)
    setValue('pacraId', companyData.pacraId)
    setValue('mainPhone', companyData.mainPhone)
    setValue('mainEmail', companyData.mainEmail)
    setValue('seasonFlag', companyData.seasonFlag == 0 ? false : true)
    setValue('fax', companyData.mainFax)
    setValue('province', companyData.province)
    setValue('region', companyData.region)
    setValue('station', companyData.station)
    setValue('area', companyData.area)
    setValue('zone', companyData.zone)
    setValue('district', companyData.district)
    setValue('sector', companyData.sector)
    setValue('created',companyData.created)
    setValue('dateIncorporated', formatDatePicker(companyData.dateIncopr))
    setValue('holdingCompany', companyData.holdingCompany)
    setValue('subsidaryCompany', companyData.subsidaryCompany)
    setValue('dateRegistered', formatDatePicker(companyData.companyRegDate))
    setValue('no_of_employees', companyData.compCxRef)
    setValue('dateEmployed', formatDatePicker(companyData.stEmploy))
    setValue('nrc', companyData.propNrc)
    setValue('nationality', companyData.propNationality)
    setValue('propFirstName', companyData.propFirstName)
    setValue('propLastName', companyData.propLastName)
    setValue('propPosition', companyData.propPosition)

}


const initialValues = {
    srId: srForm.id,
    companyName: companyData.id ? companyData.name : '',
    companyNumber: companyData.id ? companyData.id : '',
    legalName: companyData.id ? companyData.legalName : '',
    adressLine1: companyData.address ? companyData.address.adressLine1 : '',
    companyStatus:  companyData.companyStatus ? companyData.companyStatus : '',
    companySubStatus:  companyData.companySubStatus ? companyData.companySubStatus : '',
    postalCode: companyData.address ? companyData.address.postalCode : '',
    legalName: companyData.legalName,
    companyType: companyData.companyType,
    pacraId: companyData.pacraId,
    mainEmail: companyData.mainEmail,
    seasonFlag: companyData.seasonFlag == 0? false:true,
    fax:companyData.mainFax,
    province: companyData.province,
    area:companyData.area,
    region: companyData.region,
    station: companyData.station,
    zone: companyData.zone,
    district: companyData.district,
    mainPhone:companyData.mainPhone,
    sector: companyData.sector,
    created: companyData.created,
    dateIncorporated:formatDatePicker(companyData.dateIncopr),
    holdingCompany:companyData.holdingCompany,
    subsidaryCompany:companyData.subsidaryCompany,
    dateRegistered: companyData.companyRegDate,
    no_of_employees: companyData.compCxRef,
    dateEmployed: formatDatePicker(companyData.stEmploy),
    nrc: companyData.vo?companyData.vo.nrc:'',
    nationality: companyData.address ? companyData.address.country : '',
    propFirstName: companyData.propFirstName,
    propLastName: companyData.propLastName,
    propPosition: companyData.propPosition
}

    function callback(key) {
    }

    return (
        <div className="row p-1">
            <div class="card">
                <div class="card-body">


                    {/* <FormikProvider value={formik}> */}
                        <form className='form'>


                            <div className='row'>
                                <div className='col'>
                                    <h1 className="display-5">{initialValues.companyName}</h1>
                                </div>
                                <div className='col float-end'>
                                    <p className='font-weight-bold font-italic fs-6 float-end '><i>Last Updated : {formatDate(companyData.lastUpdated)}</i></p>
                                </div>



                                <div class="px-2 m-2">
                                    <table className="float-end">


                                        <td className="px-3"> <button type="button" className="btn btn-danger float-end rounded-pill" onClick={handleSubmit(onSubmitSRE)}>Save</button></td>
                                        <td className="px-3">  <button type="button" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={()=>{sendForApprovalSR(props.srFormData.id)}} >Send for Approval</button></td>
                                        <td className="px-3">  <button type="button" className="btn btn-danger float-end rounded-pill" onClick={sendForAccept} >Accept</button></td>

                                        <td className="px-3">  <button type="button" className="btn btn-danger float-end rounded-pill" onClick={() => { }} >Reject</button></td>
                                    </table>
                                </div>
                                <div className='col'>

                                    <p className="card-title fs-3 mb-3">Employer Details</p>

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
                                                    defaultValue={initialValues.companyName.toUpperCase()} {...register("companyName")} onChange={(e)=> setValue("companyName",e.target.value.toUpperCase())} disabled={isdisabled} />
                                            </td>



                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Legal Name :  </label>
                                            </td>
                                            <td className='p-1' colSpan={3}>
                                                <input type="text" className='form-control float-start '
                                                    id="legalName"
                                                    name="legalName"
                                                    style={{ width: '100%' }}
                                                    defaultValue={initialValues.legalName} {...register("legalName")} onChange={(e)=> setValue("legalName",e.target.value.toUpperCase())} disabled={isdisabled} />
                                            </td>

                                        </tr>
                                        <tr className='p-1'>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Employer # : </label></td>
                                            <td className='p-1'> <input type="text"
                                                className='form-control float-start '
                                                name='companyNumber'
                                                id='companyNumber'
                                                style={{ width: '230px' }}
                                                defaultValue={initialValues.companyNumber}  {...register("companyNumber")} disabled /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Employer Type :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="companyType"
                                                name="companyType"
                                                style={{ width: '100%' }}
                                                value={companyData.companyType}  {...register("companyType")} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>PACRA ID :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="pacraId"
                                                name="pacraId"
                                                style={{ width: '100%' }}
                                                defaultValue={initialValues.pacraId} {...register("pacraId")} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Seasonal/Regular Flag :  </label></td>
                                            <td className='p-1'>
                                                <input type="checkbox" className='float-start '
                                                    id="seasonFlag"
                                                    name="seasonFlag"

                                                    defaultChecked={initialValues.seasonFlag}  {...register("seasonFlag")} disabled={isdisabled}/></td>
                                        </tr>
                                        <tr className='p-1'>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Phone # :  </label></td>
                                            <td className='p-1'> <input type="number"
                                                className='form-control float-start '
                                                name='mainPhone'
                                                id='mainPhone'
                                                style={{ width: '230px' }}
                                                defaultValue={initialValues.mainPhone}
                                                {...register("mainPhone")} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Email ID :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="mainEmail"
                                                name="mainEmail"
                                                style={{ width: '100%' }}
                                                defaultValue={initialValues.mainEmail}
                                                {...register("mainEmail")} disabled={isdisabled} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Fax :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="fax"
                                                name="fax"
                                                style={{ width: '100%' }}
                                                defaultValue={initialValues.fax}    {...register("fax")} disabled={isdisabled} /></td>

                                        </tr>
                                        <tr className='p-1'>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Residential Address:  </label></td>
                                            <td className='p-1' colSpan={3}> <input type="text"
                                                className='form-control float-start '
                                                name='adressLine1'
                                                id='adressLine1'
                                                style={{ width: '100%' }}
                                                defaultValue={_.defaultTo(initialValues.adressLine1, '')} {...register("adressLine1")} disabled={true} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Status :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="companyStatus"
                                                name="companyStatus"
                                                style={{ width: '100%' }}
                                                defaultValue={initialValues.companyStatus} disabled={true} /></td>
                                            <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Sub Status :  </label></td>
                                            <td className='p-1'> <input type="text" className='form-control float-start '
                                                id="companySubStatus"
                                                name="companySubStatus"
                                                style={{ width: '100%' }}
                                                defaultValue={initialValues.companySubStatus}  {...register("companySubStatus")} disabled={true} /></td>
                                        </tr>

                                    </tbody>
                                </table>

                            </div>



                            <div className='col pt-3'>

                                <p className="card-title fs-3 mb-3">Business Details</p>
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
                                            defaultValue={_.defaultTo(initialValues.holdingCompany)}    {...register("holdingCompany")} disabled={isdisabled} /></td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Subsidiary Company :  </label></td>
                                        <td className='p-1'> <input type="text" className='form-control float-start '
                                            id="subsidaryCompany"
                                            name="subsidaryCompany"
                                            style={{ width: '100%' }}
                                            defaultValue={initialValues.subsidaryCompany}  {...register("subsidaryCompany")} disabled={isdisabled} /></td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Sector Code :  </label></td>
                                        <td className='p-1'>
                                            
                                            <select class="form-select float-start" name='sector' id='sector' style={{ width: '230px' }} defaultValue={initialValues.sector}    {...register("sector")} disabled={isdisabled}>
                                                <option value=''></option>
                                                { lookUp ? lookUp.TCX_SECTOR.map((item)=>(
                                                   <option defaultValue={item} key={item}>{item}</option>  
                                                )):null
                                            }

                                            </select>
                                        </td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Number of Employees :  </label></td>
                                        <td className='p-1'> <input type="number" className='form-control float-start '
                                            id="no_of_employees"
                                            name="no_of_employees"
                                            style={{ width: '100%' }}
                                            defaultValue={initialValues.no_of_employees}   {...register("no_of_employees")} disabled={isdisabled} /></td>
                                    </tr>
                                    <tr className='p-1'>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Incorporated :  </label></td>
                                        <td className='p-1'> <input type="date"
                                            className='form-control float-start '
                                            name='dateIncorporated'
                                            id='dateIncorporated'
                                            style={{ width: '230px' }}
                                            
                                            defaultValue={formatDate(Date.parse(initialValues.dateIncorporated))}    {...register("dateIncorporated")} 
                                           disabled={isdisabled} /></td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Started Employing :  </label></td>
                                        <td className='p-1'> <input type="date" className='form-control float-start '
                                            id="dateEmployed"
                                            name="dateEmployed"
                                            style={{ width: '100%' }}
                                            defaultValue={formatDate(initialValues.dateEmployed)} {...register("dateEmployed")} disabled={isdisabled} /></td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Registered with NAPSA :  </label></td>
                                        <td className='p-1'> <input type="date" className='form-control float-start '
                                            id="dateRegistered"
                                            name="dateRegistered"
                                            style={{ width: '100%' }}
                                            defaultValue={formatDate(Date.parse(initialValues.dateRegistered))}    {...register("dateRegistered")} disabled={isdisabled} /></td>

                                    </tr>

                                </tbody>
                            </table>

                            <div className='col pt-3'>
                                <p className="card-title fs-3 mb-3">Properietor Details</p>

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
                                            defaultValue={_.defaultTo(initialValues.propFirstName, '')}    {...register("propFirstName")} disabled={isdisabled} /></td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Last Name :  </label></td>
                                        <td className='p-1'> <input type="text" className='form-control float-start '
                                            id="propLastName"
                                            name="propLastName"
                                            style={{ width: '100%' }}
                                            defaultValue={_.defaultTo(initialValues.propLastName, '')}  {...register("propLastName")} disabled={isdisabled} /></td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>NRC # :  </label></td>
                                        <td className='p-1'> <input type="text" className='form-control float-start '
                                            id="nrc"
                                            name="nrc"
                                            style={{ width: '100%' }}
                                            defaultValue={_.defaultTo(initialValues.nrc, '')}    {...register("nrc")} disabled={isdisabled} /></td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Nationality :  </label></td>
                                        <td className='p-1'>   <select id="nationality" name="nationality" defaultValue={_.defaultTo(initialValues.nationality, '')} className={"form-control float-start"} style={{ width: '230px' }}    {...register("nationality")} disabled={isdisabled} >
                                                <option value=' '></option>
                                                { lookUp ? lookUp.TCX_NATIOANLITY.map((item)=>(
                                                   <option defaultValue={item} key={item}>{item}</option>  
                                                )):null}

                                            </select></td>
                                    </tr>
                                    <tr className='p-1'>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Position :  </label></td>
                                        <td className='p-1'> <input type="text"
                                            className='form-control float-start '
                                            name='propPosition'
                                            id='propPosition'
                                            style={{ width: '230px' }}
                                            defaultValue={_.defaultTo(initialValues.propPosition, '')}    {...register("propPosition")} disabled={isdisabled} /></td>


                                    </tr>

                                </tbody>
                            </table>

                            <div className='col pt-3'>

                                <p className="card-title fs-3 mb-3">Location Details</p>


                                <hr />
                            </div>
                            <table style={{ width: "100%" }}>
                                <tbody className='fs-6'>


                                    <tr className='p-1'>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Region :  </label></td>
                                        <td className='p-1'>
                                            <select id="region" name="region" defaultValue={_.defaultTo(initialValues.region, '')} className={"form-control float-start"} style={{ width: '230px' }}    {...register("region")} disabled={isdisabled} >
                                                <option value=' '></option>
                                                { lookUp ? lookUp.TCX_NATIOANLITY.map((item)=>(
                                                   <option defaultValue={item} key={item}>{item}</option>  
                                                )):null}

                                            </select>
                                        </td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Province :  </label></td>
                                        <td className='p-1'>
                                            <select id="province" name="province" defaultValue={_.defaultTo(initialValues.province, '')} className={"form-control float-start"} style={{ width: '230px' }}    {...register("province")} disabled={isdisabled} >
                                                <option value=' '></option>
                                                { lookUp ? lookUp.TCX_PROVINCE.map((item)=>(
                                                   <option defaultValue={item} key={item}>{item}</option>  
                                                )):null}

                                            </select>
                                        </td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Area :  </label></td>
                                        <td className='p-1'>
                                            <select id="area" name="area" defaultValue={_.defaultTo(initialValues.area, '')} className={"form-control float-start"} style={{ width: '230px' }}    {...register("area")} disabled={isdisabled} >
                                                <option value=' '></option>
                                                { lookUp ? lookUp.TCX_AREA.map((item)=>(
                                                   <option defaultValue={item} key={item}>{item}</option>  
                                                )):null}

                                            </select>
                                        </td>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>District :  </label></td>
                                        <td className='p-1'>
                                            <select id="district" name="district" defaultValue={_.defaultTo(initialValues.district, '')} className={"form-control float-start"} style={{ width: '230px' }}    {...register("district")} disabled={isdisabled} >
                                                <option value=' '></option>
                                                { lookUp ? lookUp.TCX_DISTRICT.map((item)=>(
                                                   <option defaultValue={item} key={item}>{item}</option>  
                                                )):null}


                                            </select>
                                        </td>
                                    </tr>
                                    <tr className='p-1'>
                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Station :  </label></td>
                                        <td className='p-1'>
                                            <select id="station" name="station" defaultValue={_.defaultTo(initialValues.station, '')} className={"form-control float-start"} style={{ width: '230px' }}    {...register("station")} disabled={isdisabled} >
                                                <option value=' '></option>
                                                { lookUp ? lookUp.TCX_STATION.map((item)=>(
                                                   <option defaultValue={item} key={item}>{item}</option>  
                                                )):null}

                                            </select>
                                        </td>


                                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Zone :  </label></td>
                                        <td className='p-1'>
                                            <select id="zone" name="zone" defaultValue={_.defaultTo(initialValues.zone, '')} className={"form-control float-start"} style={{ width: '230px' }}    {...register("zone")} disabled={isdisabled} >
                                                <option value=' '></option>
                                                { lookUp ? lookUp.TCX_ZONE.map((item)=>(
                                                   <option defaultValue={item} key={item}>{item}</option>  
                                                )):null}

                                            </select>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <div className='row mt-5'>
                                <Tabs onChange={callback} defaultActiveKey='1' type="card">
                                    <TabPane tab="Checklist (Attachments)" key="1">
                                        <div className='row'>

                                            <div className='col px-5'>
                                                {/* <Activities show={false} emp={emp_no} /> */}
                                                <ChecklistUpload empNumber={emp_no} />
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Contacts" key="2">
                                        <div className='row'>



                                            <div className='col px-5'>
                                                <Contacts empNumber={emp_no} />


                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Addresses" key="3">
                                        <div className='row'>


                                            <div className='col px-5'>
                                                <Address empNumber={emp_no}/>


                                            </div>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>

                        </form>
                
                </div>
            </div>
        </div>
    )
}

export default Employer_registration
