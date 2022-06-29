import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/commons';

function Contacts(props) {

    const[empNumber,setEmpNumber] = useState(props.empNumber)
    const[contactData,setContactData] = useState(null)
    const _ = require('lodash')

    useEffect(()=>{
        
        axios.get(API_URL+'/getContactByCompanyId/'+empNumber).then(
            (res) => {
                console.log(res.data)
                setContactData(res.data)
            }
        )

    },[])

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
    return (
        <>
         <table className="float-end">

<td className="p-3"> <button type="button" className="btn btn-danger float-start rounded-pill" onClick={()=>{}}>+ Add</button></td>

</table>
            <Table onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {  }, // click row
                                onDoubleClick: event => { }, // double click row
                                onContextMenu: event => { }, // right button click row
                                onMouseEnter: event => { }, // mouse enter row
                                onMouseLeave: event => { }, // mouse leave row
                            };
                        }} columns={columns} dataSource={contactData} 
                        loading={_.isNull(contactData)?true:false}
                        pagination={{
                            position: ['none','bottomCenter'],
                            defaultPageSize: 5,
                          }} />
        </>
    );
}

export default Contacts;