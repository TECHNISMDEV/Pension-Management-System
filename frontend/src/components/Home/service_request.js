import { React, useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import {API_URL, formatDate} from '../../utils/commons'
import {Link} from 'react-router-dom'
import axios from 'axios'

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

function Service_request() {
   

    const [srData, setSrData] = useState(null)
    const _ = require('lodash')
   
    const userdata = useSelector(state => state.AuthReducer).user;
    useEffect(() => {
        
        axios.post(API_URL+'/serviceRequestByOwnerId/'+userdata.id).then(
            (res)=>(

                console.log(res.data),
                setSrData(res.data)
         
            )
        )
        
       
    }, [])
    const columns = [
        {
          title: 'SR#',
          dataIndex: 'srNumber',
          key: 'srNumber',
          render: text => <a className="stretched-link" href={"/dashboard/service/"+text}>{text}</a>
        },
        {
          title: 'SR Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Employer Name',
          dataIndex: ['company','name'],
          key: 'name',
        },
        {
            title: 'Employer Number',
            dataIndex: ['company','id'],
            key: 'address',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: 'Owner',
            dataIndex: 'ownerId',
            key: 'ownerId',
          },
          {
            title: 'SSN',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: 'Created On',
            dataIndex: 'created',
            key: 'created',
            render: text => <p>{formatDate(text)}</p>
          }
      ]


    return (


        <div className="p-3">
            <div className="row p-3">
                <div className="card">
                    <div className="card-body">
                        <p className="card-title fs-3 mb-3">My Service Request</p>

                        {/* <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">SR#</th>
                                    <th scope="col">SR Type</th>
                                    <th scope="col">Employer Name</th>
                                    <th scope="col">Employer Number</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">SSN</th>
                                    <th scope="col">Created On</th>
                                </tr>
                            </thead>
                           
                                <tbody>
                                {srData && srData.map((key)=>(
                                   <tr key={key.id}>
                                       <td scope="row">{key.id}</td>
                                        <td scope="row">{key.type}</td>
                                        <td scope="row">{key.company ? key.company.name : ''}</td>
                                        <td scope="row">{key.company?<a href={'/dashboard/employer/'+key.company.id}>{key.company.id}</a>:''}</td>
                                        <td scope="row">{key.status}</td>
                                        <td scope="row">{key.contactName}</td>
                                        <td scope="row">{}</td>
                                        <td scope="row">{formatDate(key.created)}</td>
                                        
                                   </tr>
                                   
                                  

                               ))}

                                </tbody>
                                                  

                        </table> */}

                    <Table  onRow={(record, rowIndex) => {
                            return {
                                onClick: event => { }, // click row
                                onDoubleClick: event => { }, // double click row
                                onContextMenu: event => { }, // right button click row
                                onMouseEnter: event => { }, // mouse enter row
                                onMouseLeave: event => { }, // mouse leave row
                            };
                        }} columns={columns} dataSource={srData} 
                        loading={_.isNull(srData)?true:false} 
                        pagination={{
                            position: ['none','bottomCenter'],
                            defaultPageSize: 5,
                          }}/>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service_request
