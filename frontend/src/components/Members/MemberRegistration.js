import React, { useState } from 'react';
import { Button, Modal, Input, Space, Table, AutoComplete } from 'antd';
import { API_URL, formatDate } from '../../utils/commons';
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function MemberRegistration(props) {

    const [memberList, setMemberList] = useState([])
    const empNumber = props.id
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalMB, setVisibleModalMB] = useState(false);
    const [uploadFile, setUploadFile] = useState(null)
    const [showBenfTable, setShowBenfTable] = useState(false)
    const [benfList,setBenfList] = useState([])
    

    const lookUp = props.lookUp
    const srFormData = props.srFormData
    const _ = require("lodash");
    const userdata = useSelector(state => state.AuthReducer).user;
    const schema = yup.object().shape({
        contact_no : yup.string().min(10),
        contact_mail : yup.string().email()
    })
    const { register, handleSubmit, watch, reset,formState: { errors } ,setValue} = useForm(
        { resolver: yupResolver(schema) }
    );

    const initialValues = {
        firstName:'',
        middleName:'',
        lastName:'',
        dob:'',
        docNum:'',
        docType:'',
        ssn:'',
        nrc:'',
        email:'',
        mobileNumber:'',
        prAddressID:'',
        prBenfID:'',
        retirementDate:'',
        dod:'',
        ownerId:'',
        nationality:''
        
    }

    const onSubmit = data =>{ 
        console.log(data)
        submitNewMemberList(data)
        reset(initialValues)
        setVisibleModal(false);
    };


    const submitNewMemberList = (data)=>{
        // axios.post(API_URL+'/addNewCompanyContact',  submitNewMember(data,empNumber,userdata.id,srFormData)).
        // then((res)=>{
           
        // setMemberList(prevArray => [...prevArray, res.data])
        // }).catch((err)=>{
        //     alert(err)
        // })
        console.log(data)
}


    useEffect(() => {
        console.log(empNumber)
        console.log(srFormData)

        axios.get(API_URL + '/getMemberByCompanyId/' + empNumber).then(

            (res) => {
                console.log(res.data)
                setMemberList(res.data)
            }
        )


    }, [])


    const showBenfTablePanel = (record,rowIndex)=>{
        axios.get(API_URL + '/getBenificiaryByMemberId/' + record.id).then(

            (res) => {
                console.log(res.data)
                setBenfList(res.data)
                setShowBenfTable(true)
            }
        )
    }

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',

        },
        {
            title: 'Middle Name',
            dataIndex: 'middleName',
            key: 'middleName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'SSN',
            dataIndex: 'ssn',
            key: 'ssn',
        },
        {
            title: 'NRC',
            dataIndex: 'nrc',
            key: 'nrc',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
      
        {
            title: 'Mobile Number',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Retirement Date',
            dataIndex: 'retirmentDate',
            key: 'retirmentDate',

            render: date => <p>{formatDate(date)}</p>,
        },

        {
            title: 'Date of Death',
            dataIndex: 'dod',
            key: 'dod',
        },

        {
            title: 'Nationality',
            dataIndex: 'nationality',
            key: 'nationality',
        }
    ];

    const handleMBUpload=()=>{
        setVisibleModalMB(false)
    }

    const handleAddMember = ()=>{
        setVisibleModal(false)
    }

    return (
        <>
            <div className="p-1">
                <div className="row">
                    <div className="card">
                    <div class="px-2 m-2">
                                    <table className="float-end">


                                        <td className="px-3"> <button type="button" className="btn btn-danger float-end rounded-pill" style={{width:'100%'}} onClick={()=>{ setVisibleModalMB(true)}}>Members & Beneficiaries upload</button></td>
                                        <td className='p-3'><button type="button" className="btn btn-danger float-end rounded-pill" onClick={() => setVisibleModal(true)} >+ Add</button></td>
                                        <td className="px-3">  <button type="button" className="btn btn-danger float-end rounded-pill" style={{ width: "200px" }} onClick={()=>{}} >Send for Approval</button></td>
                                        <td className="px-3">  <button type="button" className="btn btn-danger float-end rounded-pill" onClick={()=>{}} >Accept</button></td>

                                        <td className="px-3">  <button type="button" className="btn btn-danger float-end rounded-pill" onClick={() => { }} >Reject</button></td>
                                    </table>
                                </div>
                        <div className="card-body">
                           
                            <div className="py-3"> <Modal
                                title="Add Member"
                                centered
                                open={visibleModal}
                                onOk={() => handleAddMember}
                                onCancel={() => setVisibleModal(false)}
                               width={1800}
                                bodyStyle={{height:'auto', minHeight:'400px'}}
                            >
                                <form className='form'>
                                    <table>

                                        <tbody className='fs-6'>

                                            <tr>
                                                <td className=' p-3 tcx-form-label'><label className='form-label float-end'>First Name :  </label></td>
                                                <td className='p-3'> <input type="text"
                                                    className='form-control float-start '
                                                    name='firstName'
                                                    id='firstName'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.firstName, '')}    {...register("firstName")} /></td>
                                                    <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Middle Name :  </label></td>
                                                <td className='p-3'> <input type="text"
                                                    className='form-control float-start '
                                                    name='middleName'
                                                    id='middleName'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.middleName, '')}    {...register("middleName")} /></td>
                                                    <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Last Name :  </label></td>
                                                <td className='p-3'> <input type="text"
                                                    className='form-control float-start '
                                                    name='lastName'
                                                    id='lastName'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.lastName, '')}    {...register("lastName")} /></td>
                                                    <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Date Of Birth :  </label></td>
                                                <td className='p-3'> <input type="date"
                                                    className='form-control float-start '
                                                    name='dob'
                                                    id='dob'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.dob, '')}    {...register("dob")} /></td>
                                            </tr>
                                            <tr>
                                                <td className=' p-3 tcx-form-label'><label className='form-label float-end'>SSN :  </label></td>
                                                <td className='p-3'> <input type="text"
                                                    className='form-control float-start '
                                                    name='ssn'
                                                    id='ssn'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.ssn, '')}    {...register("ssn")} /></td>
                                                    <td className=' p-3 tcx-form-label'><label className='form-label float-end'>NRC:  </label></td>
                                                <td className='p-3'> <input type="number"
                                                    className='form-control float-start '
                                                    name='nrc'
                                                    id='nrc'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.nrc, '')}    {...register("nrc")} /></td>
                                                    <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Email :  </label></td>
                                                <td className='p-3'> <input type="text"
                                                    className='form-control float-start '
                                                    name='email'
                                                    id='email'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.email, '')}    {...register("email")} /></td>
                                                    <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Mobile Number :  </label></td>
                                                <td className='p-3'> <input type="text"
                                                    className='form-control float-start '
                                                    name='mobileNumber'
                                                    id='mobileNumber'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.mobileNumber, '')}    {...register("mobileNumber")} /></td>
                                            </tr>
                                            <tr>
                                                <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Retirement Date :  </label></td>
                                                <td className='p-3'> <input type="date"
                                                    className='form-control float-start '
                                                    name='retirementDate'
                                                    id='retirementDate'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.retirementDate, '')}    {...register("retirementDate")} /></td>
                                                    <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Date of Death :  </label></td>
                                                <td className='p-3'> <input type="date"
                                                    className='form-control float-start '
                                                    name='dod'
                                                    id='dod'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.dod, '')}    {...register("dod")} /></td>
                                                    <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Nationality :  </label></td>
                                                    <td className='p-3'>  <select id="nationality" name="nationality" defaultValue={_.defaultTo(initialValues.nationality, '')} className={"form-control float-start"} style={{ width: '230px' }}    {...register("nationality")}>
                                                <option value=' '></option>
                                                { lookUp ? lookUp.TCX_NATIOANLITY.map((item)=>(
                                                   <option defaultValue={item} key={item}>{item}</option>  
                                                )):null}

                                            </select></td>
                                            </tr>
                                            <tr>
                                                <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Document Number :  </label></td>
                                                <td className='p-3'> <input type="text"
                                                    className='form-control float-start '
                                                    name='memberFirstName'
                                                    id='memberFirstName'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.firstName, '')}    {...register("firstName")} /></td>
                                                    <td className=' p-3 tcx-form-label'><label className='form-label float-end'>Document Type :  </label></td>
                                                <td className='p-3'> <input type="text"
                                                    className='form-control float-start '
                                                    name='memberFirstName'
                                                    id='memberFirstName'
                                                    style={{ width: '230px' }}
                                                    defaultValue={_.defaultTo(initialValues.firstName, '')}    {...register("firstName")} /></td>
                                              
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            
                            </Modal>
                            </div>

                            <div className="py-3"> <Modal
                                title="Upload Members and Beneficiaries"
                                centered
                                visible={visibleModalMB}
                                okText="Upload"
                                onOk={() => handleMBUpload()}
                                onCancel={() => setVisibleModalMB(false)}
                               width={800}
                                bodyStyle={{height:'auto'}}
                            >
                                <input type="file" id="uploadFile"class="custom-file-input" onChange={(e) => {
                    setUploadFile(e.target.files[0])
                    }} />
                            </Modal>
                            </div>

                            <Table onRow={(record, rowIndex) => {
                                return {
                                    onClick: event => { showBenfTablePanel(record,rowIndex) }, // click row ex:- handleEmployerRowClick(record, rowIndex)
                                    onDoubleClick: event => { }, // double click row
                                    onContextMenu: event => { }, // right button click row
                                    onMouseEnter: event => { }, // mouse enter row
                                    onMouseLeave: event => { }, // mouse leave row
                                };
                            }} columns={columns} dataSource={memberList}
                                // loading={employerList.length===0?true:false}
                                pagination={{
                                    position: ['none', 'bottomCenter'],
                                    defaultPageSize: 5,
                                }}

                            /></div>
                            
                       

                    </div>
                    { showBenfTable &&
                    <div className='card my-3'>
                         <div class="px-2 m-2">
                                    <table className="float-end">


                                      
                                        <td className='p-3'><button type="button" className="btn btn-danger float-end rounded-pill" onClick={() => setVisibleModal(true)} >+ Add</button></td>
                                   
                                    </table>
                                </div>
                            <Table onRow={(record, rowIndex) => {
                                return {
                                    onClick: event => { }, // click row ex:- handleEmployerRowClick(record, rowIndex)
                                    onDoubleClick: event => { }, // double click row
                                    onContextMenu: event => { }, // right button click row
                                    onMouseEnter: event => { }, // mouse enter row
                                    onMouseLeave: event => { }, // mouse leave row
                                };
                            }} columns={columns} dataSource={benfList}
                                // loading={employerList.length===0?true:false}
                                pagination={{
                                    position: ['none', 'bottomCenter'],
                                    defaultPageSize: 5,
                                }}

                            />
                        </div>}
                </div>
            </div>
        </>
    );
}

export default MemberRegistration;