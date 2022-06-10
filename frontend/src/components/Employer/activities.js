import { React, useState,useEffect } from 'react'
import { Collapse } from 'antd'
import axios from 'axios'
import { useFormik } from 'formik';
const { Panel } = Collapse;




function Activities(props) {
  const [file1, setfile1] = useState([])
  const API_URL = "http://localhost:8080/app";
  const formik = useFormik({
    initialValues:{
      file1:null,
      file2:null
    }
  })
const [isdisabled, setisdisabled] = useState(false)

  const handleFile1 = (e) => {

    e.preventDefault()

    const fd =new FormData();
    fd.append('file',formik.values.file1)
    fd.append('companyId',props.emp)
   axios.post(API_URL+'/activityFileupload',fd).then((res)=>{

    console.log(res)
    alert("File was uploaded successfully!!")
   })
    
  }
  const handleFile2 = (e) => {

    e.preventDefault()

    const fd =new FormData();
    fd.append('file',formik.values.file2)
    fd.append('companyId',props.emp)
   axios.post(API_URL+'/activityFileupload',fd).then((res)=>{

    console.log(res)
    alert("File was uploaded successfully!!")
   })
    
  }
  return (
    <div>
      <Collapse accordion>
        <Panel header="Upload Identification Document" key="1">
          <div class="input-group mb-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input" onChange={(e) => {
                    formik.setFieldValue("file1", e.target.files[0])}} disabled={isdisabled}/>

              <button type="button" class="btn btn-outline-danger" onClick={(e)=>{handleFile1(e)}}>Upload</button>
            </div>

          </div>
        </Panel>
        <Panel header="Upload Additional Attachments" key="2">
          <div class="input-group mb-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input" onChange={(e) => {
                    formik.setFieldValue("file2", e.target.files[0])}} disabled={isdisabled}/>

              <button type="button" class="btn btn-outline-danger" onClick={(e)=>{handleFile2(e)}}>Upload</button>
            </div>

          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

export default Activities