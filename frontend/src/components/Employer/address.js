import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { API_URL, submitNewAddress } from '../../utils/commons';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";



function Address(props) {

    const[empNumber,setEmpNumber] = useState(props.empNumber)

    const[addressData,setAddressData] = useState([])
    const [isDisable,setIsDisable] = useState(!props.hide)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const _ = require('lodash')
    const userdata = useSelector(state => state.AuthReducer).user;
    const { register, handleSubmit , setValue, reset, watch, formState: { errors } } = useForm()
    const watchAllFields = watch();

    const onSubmit = data =>{ 
        console.log(data)
        submitNewAddressData(data)
        reset(initialValues)
        setIsModalVisible(false);
    };

    const submitNewAddressData= (data)=>{
        axios.post(API_URL+'/addCompanyAdress',  submitNewAddress(data,empNumber,userdata.id)).
        then((res)=>{
           
            setAddressData(prevArray => [...prevArray, res.data])
        }).catch((err)=>{
            alert(err)
        })
}


    useEffect(()=>{
        
        axios.get(API_URL+'/getAdressByCompanyId/'+empNumber).then(
            (res) => {
                console.log(res.data)
                setAddressData(res.data)
            }
        )

    },[])

    const columns = [
        {

            title: 'Address Line 1',
            dataIndex: 'adressLine1',
            key: 'adressLine1',
        },
        {
            title: 'Address Line 2',
            dataIndex: 'adressLine2',
            key: 'adressLine2',
        },

            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Address Type',
            dataIndex: 'adressType',
            key: 'adressType',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        }, {
            title: 'Province/State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Postal Code',
            dataIndex: 'postalCode',
            key: 'postalCode',
        },
    ]



    const showModal = () => {
        setIsModalVisible(true);
    };

    

    const handleCancel = () => {
        reset(initialValues)
        setIsModalVisible(false);
    };


    const initialValues = {
        adressLine1: '',
        adressLine2: '',
        adressLine3: '',
        adressLine4: '',
        adressType: false,
        city: '',
        companyId: '',
        country: '',
        craeatedBy: '',
        created: '',
        districtProvience: '',
        id: '',
        lastUpdBy: '',
        last_Updated: '',
        loginId: '',
        memberId: '',
        postalCode: '',
        state: '',
      }





    return (
        <>
         <table className="float-end">


         { isDisable && <td className="p-3"> <button type="button" className="btn btn-danger float-start rounded-pill" onClick={showModal}>+ Add</button></td>}

</table>

 <Modal title="Contacts" visible={isModalVisible} onOk={handleSubmit(onSubmit)} onCancel={handleCancel}>
                <form>
                   <div className='row'>
                    <div className='mx-5'>
                    <table>
                        <tbody className=''>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Address Line 1:</label></td>
                            <td className='p-1'>  <input type="text"
                                className='form-control float-start '
                                id="adressLine1"
                                name="adressLine1"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.adressLine1} {...register("adressLine1")} required/>
                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Address Line 2:</label></td>
                            <td className='p-1'>  <input type="text"
                                className='form-control float-start '
                                id="adressLine2"
                                name="adressLine2"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.adressLine2} {...register("adressLine2")} required/>
                                </td>
                        </tr>
                      
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Address Type :</label></td>
                            <td className='p-1'>  <input type="checkbox"
                                className='float-start'
                                id="adressType"
                                name="adressType"
                                style={{ width: '100%' }}
                                defaultChecked={initialValues.adressType} {...register("adressType")}/>
                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>City :</label></td>
                            <td className='p-1'>  <input type="text"
                                className='form-control float-start'
                                id="city"
                                name="city"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.city} {...register("city")}/>
                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Country :</label></td>
                            <td className='p-1'>  <input type="text"
                                className=' form-control float-start'
                                id="country"
                                name="country"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.country} {...register("country")}/>
                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Province/State :</label></td>
                            <td className='p-1'>  <input type="text"
                                className='form-control  float-start'
                                id="districtProvience"
                                name="districtProvience"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.districtProvience} {...register("districtProvience")}/>
                                </td>
                        </tr>
                        <tr>  <td className='tcx-form-label'><label className='form-label float-end'>Postal Code :</label></td>
                            <td className='p-1'>  <input type="number"
                                className='form-control  float-start'
                                id="postalCode"
                                name="postalCode"
                                style={{ width: '100%' }}
                                defaultValue={initialValues.postalCode} {...register("postalCode")} required/>
                                </td>
                        </tr>
                        
                        </tbody>
                    </table>

                    </div>
                    </div> 
                </form>
            </Modal>



            <Table onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {  }, // click row
                                onDoubleClick: event => { }, // double click row
                                onContextMenu: event => { }, // right button click row
                                onMouseEnter: event => { }, // mouse enter row
                                onMouseLeave: event => { }, // mouse leave row
                            };
                        }} columns={columns} dataSource={addressData} 
                        loading={_.isNull(addressData)?true:false}
                        pagination={{
                            position: ['none','bottomCenter'],
                            defaultPageSize: 5,
                          }} />
        </>
    );
}

export default Address;