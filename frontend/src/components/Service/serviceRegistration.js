import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { API_URL } from '../../utils/commons';
import { serviceRegistrationForm } from './formData/serviceRegistrationForm';
function ServiceRegistration(props) {
    const [srNum, setSrId] = useState(props.id?props.id:'')
    const [srFormData, setSRFormData] = useState(serviceRegistrationForm.formData)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [lookup,setLookUp] = useState()
    const [srFormDataValue,setSRFormDataValue] = useState()
    const [employerNumber,setEmployerNumber] = useState()

    useEffect(() => {
        axios.get(API_URL + '/getLookUpForEmployer').then((res) => (
            setLookUp(res.data)
        )
        )
        if (props.id) {
            axios.get(API_URL + '/serviceRequestBySrNumber/' + srNum).then(
                (res) => {
                    console.log(res.data)
                    setSRFormDataValue(res.data)
                    setEmployerNumber(res.data.company.id)
                }
            )
        }
    }, [])
    

    const handleDropDownLookup = (field)=>{
        console.log("invoked")
          return (<>
         {lookup && lookup[field].map((key)=>(
            <option key={key} value={key}>{key}</option>
         ))}
          </>)
}

    return (
        <>
            <div className='row'>
                <div className='col'>
                    <p className="card-title fs-4 mb-3">Service Request Details</p>

                </div>
                <div className='col'>

                    <p className="card-title fs-4 mb-3">Employer and Properietor Details</p>


                </div>
                <div className='col'>

                    <p className="card-title fs-4 mb-3">Contact Details</p>

                </div>
            </div>
            <hr />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row p-4'>

               
                <table>
                <tbody className='fs-6'>

                    {
                        srFormData.map((row,index) => (
                            <tr className='p-1' key={index}>
                                {row[0].id ? <> <td className='p-1 tcx-form-label'><label className='form-label float-end'>{row[0].label} :</label></td>
                                    <td className='p-1' colSpan={row[0].colSpan}>
                                        <input type={row[0].inputType} className='form-control float-start '
                                            id={row[0].id}
                                            name={row[0].id}
                                            style={{ width: '100%' }}
                                            disabled={row[0].isDisable} {...register(row[0].id)}/>
                                    </td> </>:null}
                                {row[1].id ? <> <td className='p-1 tcx-form-label'><label className='form-label float-end'>{row[1].label} :</label></td>
                                    <td className='p-1' colSpan={row[1].colSpan}>
                                       {row[1].inputType ==='select'? 
                                       <select id={row[1].id} className={"form-control float-start"}  name={row[1].id}
                                       style={{ width: '100%' }}
                                       disabled={row[1].isDisable} {...register(row[1].id)}>
                                            {
                                                handleDropDownLookup(row[1].optionKey)
                                            }
                                       </select>
                                       : <input type={row[1].inputType} className='form-control float-start '
                                            id={row[1].id}
                                            name={row[1].id}
                                            style={{ width: '100%' }}
                                            disabled={row[1].isDisable} {...register(row[1].id)}/>}
                                    </td> </>:null}
                                {row[2].id ? <><td className='p-1 tcx-form-label'><label className='form-label float-end'>{row[2].label} :</label></td>
                                    <td className='p-1' colSpan={row[2].colSpan}>
                                        <input type={row[2].inputType} className='form-control float-start '
                                            id={row[2].id}
                                            name={row[2].id}
                                            style={{ width: '100%' }}
                                            disabled={row[2].isDisable} {...register(row[2].id)}/>
                                    </td>
                                </>:null}
                                {row[3].id ? <>  <td className='p-1 tcx-form-label'><label className='form-label float-end'>{row[3].label} :</label></td>
                                    <td className='p-1' colSpan={row[3].colSpan}>
                                        <input type={row[3].inputType} className='form-control float-start '
                                            id={row[3].id}
                                            name={row[3].id}
                                            style={{ width: '100%' }}
                                            disabled={row[3].isDisable} {...register(row[3].id)}/>
                                    </td></>:null}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <input type="submit" />
                </div>
               
            </form>

        </>
    );
}

export default ServiceRegistration;