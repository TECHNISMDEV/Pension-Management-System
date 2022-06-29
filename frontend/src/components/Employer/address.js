import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/commons';

function Address(props) {

    const[empNumber,setEmpNumber] = useState(props.empNumber)
    const[addressData,setAddressData] = useState(null)
    const _ = require('lodash')

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
            title: 'Address',
            dataIndex: 'adressLine1',
            key: 'adressLine1',
        },
        {
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