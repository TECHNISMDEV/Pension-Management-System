import { React, useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import {API_URL, formatDate} from '../../utils/commons'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Service_request() {
   
    const [srData, setSrData] = useState()
   
    const userdata = useSelector(state => state.AuthReducer).user;
    useEffect(() => {
        
        axios.post(API_URL+'/serviceRequestByOwnerId/'+userdata.id).then(
            (res)=>(
                setSrData(res.data)
            )
        )
        
       
    }, [])
    console.log(srData)
    return (


        <div className="p-3">
            <div className="row p-3">
                <div className="card">
                    <div className="card-body">
                        <p className="card-title fs-3 mb-3">My Service Request</p>

                        <table class="table table-striped">
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
                                                  

                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service_request
