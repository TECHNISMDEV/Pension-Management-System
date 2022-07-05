import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { API_URL, submitNewContact } from '../../utils/commons';
import { Modal } from 'antd';
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';


function Contacts(props) {

    const _ = require('lodash')

    const [empNumber, setEmpNumber] = useState(props.empNumber)
    const [contactData, setContactData] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDisable,setIsDisable] = useState(!props.hide)
    const userdata = useSelector(state => state.AuthReducer).user;
    const { register, handleSubmit , setValue, reset, watch, formState: { errors } } = useForm();
    const watchAllFields = watch();

    const onSubmit = data =>{ 
        console.log(data)
        submitNewContactData(data)
        reset(initialValues)
        setIsModalVisible(false);
    };


    const submitNewContactData= (data)=>{
        axios.post(API_URL+'/addNewCompanyContact',  submitNewContact(data,empNumber,userdata.id)).
        then((res)=>{
           
        setContactData(prevArray => [...prevArray, res.data])
        }).catch((err)=>{
            alert(err)
        })
}


    useEffect(() => {
    console.log("invoked")
        axios.get(API_URL + '/getContactByCompanyId/' + empNumber).then(

            (res) => {
                console.log(res.data)
                setContactData(res.data)
            }
        )


    }, [])


    const columns = [
        {
            title: 'Firstname',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Lastname',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Contact Type',
            dataIndex: 'contactType',
            key: 'contactType',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobileNo',
            key: 'mobileNo',
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }
    ]



    const showModal = () => {
        setIsModalVisible(true);
    };

    

    const handleCancel = () => {
        reset(initialValues)
        setIsModalVisible(false);
    };

    const initialValues = {
        companyId: "",
        contactType: false,
        contactTypeId: '',
        craeatedBy: '',
        created: '',
        dob: '',
        documentNo: '',
        documentType: '',
        email: '',
        firstName: '',
        id: '',
        lastName: '',
        lastUpdBy: '',
        last_Updated: '',
        loginId: "",
        memberId: '',
        middleName: '',
        mobileNo: 0
    }

    return (
        <>

            <Modal title="Contacts" visible={isModalVisible} onOk={handleSubmit(onSubmit)} onCancel={handleCancel}>
                <form>
                   <div className='row'>
                    <div className='mx-5'>
                    <table>
                        <tbody className=''>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>First name :</label></td>
                            <td className='p-1'>  <input type="text"
                                className='form-control float-start '
                                id="firstName"
                                name="firstName"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.firstName} {...register("firstName")}/>
                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Last name :</label></td>
                            <td className='p-1'>  <input type="text"
                                className='form-control float-start '
                                id="lastName"
                                name="lastName"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.lastName} {...register("lastName")}/>

                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Contact Type :</label></td>
                            <td className='p-1'>  <input type="checkbox"
                                className='float-start'
                                id="contactType"
                                name="contactType"
                                style={{ width: '100%' }}
                                defaultChecked={initialValues.contactType} {...register("contactType")}/>
                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Date of Birth:</label></td>
                            <td className='p-1'>  <input type="date"
                                className='form-control float-start'
                                id="dob"
                                name="dob"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.dob} {...register("dob")}/>
                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Contact Number:</label></td>
                            <td className='p-1'>  <input type="number"
                                className=' form-control float-start'
                                id="mobileNo"
                                name="mobileNo"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.mobileNo} {...register("mobileNo")}/>
                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Contact Email:</label></td>
                            <td className='p-1'>  <input type="text"
                                className='form-control  float-start'
                                id="email"
                                name="email"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.email} {...register("email")}/>
                                </td>
                        </tr>
                        </tbody>
                    </table>

                    </div>
                    </div> 
                </form>
            </Modal>


            <table className="float-end">

              { isDisable && <td className="p-3"> <button type="button" className="btn btn-danger float-start rounded-pill" onClick={showModal}>+ Add</button></td>}

            </table>
            <Table onRow={(record, rowIndex) => {
                return {
                    onClick: event => { }, // click row
                    onDoubleClick: event => { }, // double click row
                    onContextMenu: event => { }, // right button click row
                    onMouseEnter: event => { }, // mouse enter row
                    onMouseLeave: event => { }, // mouse leave row
                };
            }} columns={columns} dataSource={contactData}
                loading={_.isNull(contactData) ? true : false}
                pagination={{
                    position: ['none', 'bottomCenter'],
                    defaultPageSize: 5,
                }} />

        </>
    );
}

export default Contacts;