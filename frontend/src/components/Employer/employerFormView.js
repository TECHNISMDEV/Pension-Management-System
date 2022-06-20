import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { formatDate } from '../../utils/commons';

function EmployerFormView(props) {
    const [formData, setFormData] = useState(props.employer)

    useEffect(() => {
        console.log(formData)
    }, [])

    return (
        <div className='container-fluid p-0'>

        <div className='row'>
            <div className='col'>
            <h1 className="display-6 mx-3 py-3 float-start">{formData.name ? formData.name.toUpperCase() : "{Employer_Name}"}</h1>
            </div>
            <div className='col'>
           
      
            </div>
        </div>

         



            <div className='col'>
                <p className='lead mx-3'>Employer Details</p>
                <hr />
            </div>
            <table style={{ width: "100%" }}>
                <tbody className='fs-6'>

                    <tr className='p-1'>
                        <td className='p-1 tcx-form-label'><label className='form-label float-end'>Employer Name :  </label>
                        </td>
                        <td className='p-1' colSpan={3}>
                            <input type="text" className='form-control float-start '
                                id="tradingName"
                                name="tradingName"
                                style={{ width: '100%' }}
                                value={formData.name} disabled />
                        </td>



                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Legal Name :  </label>
                        </td>
                        <td className='p-1' colSpan={3}>
                            <input type="text" className='form-control float-start '
                                id="legalName"
                                name="legalName"
                                style={{ width: '100%' }}
                                value={formData.legalName} disabled />
                        </td>

                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Employer # :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='id'
                            id='id'
                            style={{ width: '230px' }}
                            value={formData.id} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Employer Type :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            value={formData.type} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>PACRA ID :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={formData.pacraId} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Seasonal/Regular Flag :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="seasonFlag"
                            name="seasonFlag"
                            style={{ width: '100%' }}
                            value={formData.seasonFlag} disabled /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Phone # :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='contactNo'
                            id='contactNo'
                            style={{ width: '230px' }}
                            value={formData.contact.mobileNo} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Email ID :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            value={formData.contact.mailId} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Fax :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={formData.contact.fax} disabled /></td>

                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Residential Address:  </label></td>
                        <td className='p-1' colSpan={3}> <input type="text"
                            className='form-control float-start '
                            name='id'
                            id='id'
                            style={{ width: '100%' }}
                            value={formData.address.adressLine1} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Status :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={formData.status} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Sub Status :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="seasonFlag"
                            name="seasonFlag"
                            style={{ width: '100%' }}
                            value={formData.subStatus} disabled /></td>
                    </tr>

                </tbody>
            </table>

            <div className='col pt-3'>
                <p className='lead mx-3'>Business Details</p>
                <hr />
            </div>
            <table style={{ width: "100%" }}>
                <tbody className='fs-6'>

                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Holding Company :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='holdingCompany'
                            id='holdingCompany'
                            style={{ width: '230px' }}
                            value={formData.holdingCompany} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Subsidiary Company :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            value={formData.subsidaryCompany} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Sector Code :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={formData.sectorCode} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Number of Employees :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="seasonFlag"
                            name="seasonFlag"
                            style={{ width: '100%' }}
                            value={formData.numberOfEmployees} disabled /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Incorporated :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='dateIncorporated'
                            id='dateIncorporated'
                            style={{ width: '230px' }}
                            value={formatDate(Date.parse(formData.created))} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Started Employing :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            value={formatDate(Date.parse(formData.created))}disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Registered with NAPSA :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={formatDate(Date.parse(formData.created))} disabled /></td>

                    </tr>
                
                </tbody>
            </table>

            <div className='col pt-3'>
                <p className='lead mx-3'>Properietor Details</p>
                <hr />
            </div>
            <table style={{ width: "100%" }}>
                <tbody className='fs-6'>

                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>First Name :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='holdingCompany'
                            id='holdingCompany'
                            style={{ width: '230px' }}
                            value={formData.contact.firstName} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Last Name :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            value={formData.contact.lastName} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>NRC # :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={formData.nrcNumber} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Nationality :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="seasonFlag"
                            name="seasonFlag"
                            style={{ width: '100%' }}
                            value={formData.address.country} disabled /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Position :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='dateIncorporated'
                            id='dateIncorporated'
                            style={{ width: '230px' }}
                            value={formData.position} disabled /></td>
                       

                    </tr>
                
                </tbody>
            </table>

            <div className='col pt-3'>
                <p className='lead mx-3'>Location Details</p>
                <hr />
            </div>
            <table style={{ width: "100%" }}>
                <tbody className='fs-6'>

                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Region :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='holdingCompany'
                            id='holdingCompany'
                            style={{ width: '230px' }}
                            value={formData.holdingCompany} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Province :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            value={formData.type} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Area :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={formData.address.state} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>District :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="seasonFlag"
                            name="seasonFlag"
                            style={{ width: '100%' }}
                            value={formData.district} disabled /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Station :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='dateIncorporated'
                            id='dateIncorporated'
                            style={{ width: '230px' }}
                            value={formData.station} disabled /></td>
                       
                       <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Zone :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='dateIncorporated'
                            id='dateIncorporated'
                            style={{ width: '230px' }}
                            value={formData.zone} disabled /></td>
                    </tr>
                
                </tbody>
                </table>
        </div>
    );
}

export default EmployerFormView;