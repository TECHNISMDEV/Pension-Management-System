import React, { useEffect, useState } from 'react';
import { Table, Modal,Radio } from 'antd';
import axios from 'axios';
import { API_URL, formatDate,formatDateWithoutTimestamp } from '../../utils/commons';
import { useSelector } from 'react-redux';


function Returns(props) {
    const _ = require("lodash")
    const [isImported, setIsImported] = useState(false)
    const [returns, setReturns] = useState(null)
    const [isReturnModal, setIsReturnModal] = useState(false)
    const [uploadFile, setUploadFile] = useState(null)
    const [isReturnItems, setIsReturnItems] = useState(false)
    const [returnItems, setReturnItems] = useState(null)
    const [isLoadingReturnItems, setIsLoadingReturnItems] = useState(false)
    const [isLoadingReturns, setIsLoadingReturns] = useState(false)
    const [validateReturnId,setValidateReturnId] = useState(null)

    const userdata = useSelector(state => state.AuthReducer).user;

    useEffect(()=>{
        setIsLoadingReturns(true)
        axios.get(API_URL + '/findAllOpenReturnByOwnerId/'+userdata.id).then(
            (res) => {
                console.log(res.data)
                setIsLoadingReturns(false)
                setReturns(res.data)
            }
        )
        },[])

    const showModal = () => {
        setIsReturnModal(true);
    };

    const handleOk = () => {
    setIsLoadingReturns(true)
        var formData = new FormData()
        formData.append("file", uploadFile)
        axios({
            method: "post",
            url: API_URL + "/file-upload/"+userdata.id,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(
            (res) => {
   
                setIsLoadingReturns(false)
                setReturns(res.data.returns)
                setIsImported(true)
                alert("import successfully!!!")
            },
           
        ).catch(
            (error) => (
                setIsLoadingReturns(false),
                alert("Failed to upload!!")
            )
        )

              
        setIsReturnModal(false);
    };

    const handleCancel = () => {
        setUploadFile(null)
       
        setIsReturnModal(false);
    };

    const showReturnItems = (selectedRowKeys) => {
        setIsReturnItems(true)
        setIsLoadingReturnItems(true)
       setValidateReturnId(selectedRowKeys[0])
        axios.get(API_URL + '/getItemsByReturnId/'+selectedRowKeys[0]).then(
            (res) => {
                console.log(res.data)
                setIsLoadingReturnItems(false)
                setReturnItems(res.data)
            }
        )
       
    }

    const validateReturn = ()=>{
        setIsLoadingReturnItems(true)
        axios.get(API_URL + '/validate/'+validateReturnId).then(
            (res) => {
                console.log(res.data)
                setIsLoadingReturnItems(false)
                setReturnItems(res.data.items)
            }
        )
    }

    const columns = [
        {
            title: 'Submission Number',
            dataIndex: 'submissionNumber',
            key: 'submissionNumber',
        },
        {
            title: 'Month(MM)',
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: 'Year(YYYY)',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Employer No',
            dataIndex: 'companyId',
            key: 'companyId',
        },
        {
            title: 'Date Received',
            dataIndex: 'created',
            key: 'created',
            render:  (text) => <p>{formatDate(text)}</p>,
        },
        {
            title: 'Financial Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Imported by',
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
        // {
        //     title: 'Processing Centre',
        //     dataIndex: '',
        //     key: '',
        // },
        {
            title: 'Date Validated',
            dataIndex: 'validateDate',
            key: 'validateDate',
            render:  (text) => <p>{formatDate(text)}</p>,
        },
        {
            title: 'Return Total',
            dataIndex: 'totalReturnAmount',
            key: 'totalReturnAmount',
        },
        {
            title: 'Members Count',
            dataIndex: '',
            key: '',
            render: (text)=><p>{1}</p>
        },
        // {
        //     title: 'Date Cancel',
        //     dataIndex: '',
        //     key: '',
        // },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];


    const returnItemColumns = [
        {
            title: 'NRC Number',
            dataIndex: 'memberNrc',
            key: 'memberNrc',
        },
        {
            title: 'First Name',
            dataIndex: 'memFirstName',
            key: 'memFirstName',
        },   
        {
            title: 'Last Name',
            dataIndex: 'memeLastName',
            key: 'memeLastName',
        },   
        {
            title: 'Date Of Birth',
            dataIndex: 'memberDob',
            key: 'memberDob',
            render: (text)=><p>{formatDate(text).split(' ')[0]}</p>
        },   
        {
            title: 'Gross Wage',
            dataIndex: 'grossWage',
            key: 'grossWage',
        },   
        {
            title: 'Employer Share',
            dataIndex: 'companyShare',
            key: 'companyShare',
        },   
        {
            title: 'Employee Share',
            dataIndex: 'memberShare',
            key: 'memberShare',
        },   
        {
            title: 'Total Contribution',
            dataIndex: 'memGrossSalary',
            key: 'memGrossSalary',
        },   
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },   
        {
            title: 'Comments',
            dataIndex: 'comment',
            key: 'comment',
        },     
    ]

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            showReturnItems(selectedRowKeys)
        },
        fixed:true,
        hideSelectAll:true
      }
    return (
        <div className="p-2">
            <Modal title="Import Returns" visible={isReturnModal} onOk={handleOk} onCancel={handleCancel} okText="Upload"
                cancelText="Cancel">
                <div class="custom-file">
                    <input type="file" id="uploadFileReturns" class="custom-file-input" onChange={(e) => {
                        setUploadFile(e.target.files[0])
                    }} />

                    {/* <button type="button" class="btn btn-outline-danger" onClick={(e)=>{handleFileUpload(e)}}>Upload</button> */}
                </div>
            </Modal>
            <div class="card py-3">
                <div class="card-body">
                    <table className="float-end">
                        {!isImported && <td className="p-3"> <button type="button" className="btn btn-danger float-start rounded-pill" onClick={() => { showModal() }}>Import Returns</button></td>}
                        { <td className="p-3"> <button type="button" className="btn btn-danger float-start rounded-pill" onClick={() => { validateReturn()}}>Validate</button></td>}
                        {!isImported &&<td className="p-3"> <button type="reset" className="btn btn-danger float-start rounded-pill" onClick={() => { }}>Cancel</button></td>}
                    </table>

                    <Table onRow={(record, rowIndex) => {
                        return {
                            onClick: event => { }, // click row
                            onSelect:event =>{showReturnItems(record)},
                            onDoubleClick: event => { }, // double click row
                            onContextMenu: event => { }, // right button click row
                            onMouseEnter: event => { }, // mouse enter row
                            onMouseLeave: event => { }, // mouse leave row
                        };
                    }} 
                    rowKey="id" 
                    rowSelection={{
                        type: "radio",
                        ...rowSelection,
                      }}
                      
                    columns={columns} dataSource={returns}
                        loading={isLoadingReturns}
                        pagination={{
                            position: ['none', 'bottomCenter'],
                            defaultPageSize: 5,
                        }}

                    />

{ isReturnItems && <h1 className='display-6'>Return Items</h1>}
{ isReturnItems && <hr/>}
                   { isReturnItems && <div className=''> <Table onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {}, // click row
                            onDoubleClick: event => { }, // double click row
                            onContextMenu: event => { }, // right button click row
                            onMouseEnter: event => { }, // mouse enter row
                            onMouseLeave: event => { }, // mouse leave row
                        };
                      
                    }}   rowKey="id"
                    columns={returnItemColumns} dataSource={returnItems}
                        loading={isLoadingReturnItems}
                        pagination={{
                            position: ['none', 'bottomCenter'],
                            defaultPageSize: 5,
                        }}

                    /></div>}
                </div>
            </div>
        </div>
    );
}

export default Returns;