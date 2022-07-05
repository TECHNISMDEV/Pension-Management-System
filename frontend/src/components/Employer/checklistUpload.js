import React, { useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import Highlighter from 'react-highlight-words';

import { API_URL } from '../../utils/commons';
import axios from 'axios';

function ChecklistUpload(props) {
    const [empNumber, setEmpNumber] = useState(props.empNumber)
    const [uploadFile, setUploadFile] = useState(null)
    const [files, setFiles] = useState([])
    const [isDisable,setIsDisable] = useState(!props.hide)
    useEffect(() => {
        axios.get(API_URL + '/filesByCompanyId/' + empNumber).then(
            (res) => {
                setFiles(res.data)
            }
        )
    }, [])

const handleFileUpload = (e)=>{
    console.log(uploadFile)
    var formData = new FormData()
    formData.append("file", uploadFile)
    axios({
        method: "post",
        url: API_URL+"/uploadFile/"+empNumber,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(
        (res) => {
            setFiles(prevArray => [...prevArray, res.data])
        },
alert("uploaded successfully!!!")
    ).catch(
        (error)=>(
alert("Failed to upload!!")
        )
    )
  

}

    return (
        <div>
              <div className='row py-5'>
             
            <div class="custom-file">
            { isDisable &&    <input type="file" id="uploadFile"class="custom-file-input" onChange={(e) => {
                    setUploadFile(e.target.files[0])
                    }} />}

             { isDisable && <button type="button" class="btn btn-outline-danger" onClick={(e)=>{handleFileUpload(e)}}>Upload</button>}
            </div>

       
              </div>
            <div className='row'>


                <ul class="list-group">
                    {files.length>0 ? files.map((item) => (

                        <li class="list-group-item"><p className='lead'>{item.fileName}</p> - <a type="button" href={item.fileDownloadUri}>Download</a>

                        </li>


                    )) : <h1 className='display-6 mx-5 pb-5'>No Attachments</h1>}
                </ul>
            </div>


        </div>
    );
}

export default ChecklistUpload;