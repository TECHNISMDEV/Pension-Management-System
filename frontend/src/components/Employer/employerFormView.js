
import { Tabs } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

import { formatDate } from '../../utils/commons';
import Address from './address';
import Contacts from './contacts';
import ChecklistUpload from './checklistUpload';

function EmployerFormView(props) {
    const [formData, setFormData] = useState(props.employer)
    const _ = require('lodash')
    const { TabPane } = Tabs;
    useEffect(() => {
        console.log(formData)
    }, [])

    function callback(key) {
    }

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

            <p className="card-title fs-3 mb-3">Employer Details</p>

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
                                value={_.defaultTo(formData.name,'')} disabled />
                        </td>



                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Legal Name :  </label>
                        </td>
                        <td className='p-1' colSpan={3}>
                            <input type="text" className='form-control float-start '
                                id="legalName"
                                name="legalName"
                                style={{ width: '100%' }}
                                value={_.defaultTo(formData.legalName,'')} disabled />
                        </td>

                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Employer # :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='id'
                            id='id'
                            style={{ width: '230px' }}
                            value={_.defaultTo(formData.id,'')} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Employer Type :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="companyType"
                            name="companyType"
                            style={{ width: '100%' }}
                            value={formData.companyType} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>PACRA ID :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={_.defaultTo(formData.pacraId,'')} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Seasonal/Regular Flag :  </label></td>
                        <td className='p-1'> <input type="checkbox" className='float-start '
                            id="seasonFlag"
                            name="seasonFlag"
                            style={{ width: '100%' }}
                            checked={_.defaultTo(formData.seasonFlag,false)} disabled /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Phone # :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='mainPhone'
                            id='mainPhone'
                            style={{ width: '230px' }}
                            value={formData.mainPhone} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Email ID :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="mainEmail"
                            name="mainEmail"
                            style={{ width: '100%' }}
                            value={formData.mainEmail} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Main Fax :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={_.defaultTo(formData.mainFax,'')} disabled /></td>

                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Residential Address:  </label></td>
                        <td className='p-1' colSpan={3}> <input type="text"
                            className='form-control float-start '
                            name='id'
                            id='id'
                            style={{ width: '100%' }}
                            value={formData.address?_.defaultTo(formData.address.adressLine1,''):''} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Status :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="companyStatus"
                            name="companyStatus"
                            style={{ width: '100%' }}
                            value={formData.companyStatus} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Sub Status :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="companySubStatus"
                            name="companySubStatus"
                            style={{ width: '100%' }}
                            value={formData.companySubStatus} disabled /></td>
                    </tr>

                </tbody>
            </table>

            <div className='col pt-3'>

            <p className="card-title fs-3 mb-3">Business Details</p>

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
                            value={_.defaultTo(formData.holdingCompany,'')} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Subsidiary Company :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            value={_.defaultTo(formData.subsidaryCompany,'')} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Sector Code :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="sector"
                            name="sector"
                            style={{ width: '100%' }}
                            value={formData.sector} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Number of Employees :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="noOfEmployee"
                            name="noOfEmployee"
                            style={{ width: '100%' }}
                            value={formData.compCxRef} disabled /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Incorporated :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='dateIncopr'
                            id='dateIncopr'
                            style={{ width: '230px' }}
                            value={formatDate(Date.parse(_.defaultTo(formData.dateIncopr,'')))} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Started Employing :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            value={formatDate(Date.parse(_.defaultTo(formData.stEmploy,'')))}disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Date Registered with NAPSA :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="pacraId"
                            name="pacraId"
                            style={{ width: '100%' }}
                            value={formatDate(Date.parse(_.defaultTo(formData.created,'')))} disabled /></td>

                    </tr>
                
                </tbody>
            </table>

            <div className='col pt-3'>

            <p className="card-title fs-3 mb-3">Properietor Details</p>

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
                            value={_.defaultTo(formData.propFirstName,'')} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Last Name :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="type"
                            name="type"
                            style={{ width: '100%' }}
                            value={_.defaultTo(formData.propLastName,'')} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>NRC # :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="propNrc"
                            name="propNrc"
                            style={{ width: '100%' }}
                            value={formData.propNrc} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Nationality :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="seasonFlag"
                            name="seasonFlag"
                            style={{ width: '100%' }}
                            value={formData.address?_.defaultTo(formData.address.country,''):''} disabled /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Position :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='dateIncorporated'
                            id='dateIncorporated'
                            style={{ width: '230px' }}
                            value={_.defaultTo(formData.propPosition,'')} disabled /></td>
                       

                    </tr>
                
                </tbody>
            </table>

            <div className='col pt-3'>

            <p className="card-title fs-3 mb-3">Location Details</p>

                <hr />
            </div>
            <table style={{ width: "100%" }}>
                <tbody className='fs-6'>

                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Region :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='region'
                            id='region'
                            style={{ width: '230px' }}
                            value={_.defaultTo(formData.region,'')} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Province :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="province"
                            name="province"
                            style={{ width: '100%' }}
                            value={_.defaultTo(formData.province,'')} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Area :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="state"
                            name="state"
                            style={{ width: '100%' }}
                            value={formData.address?_.defaultTo(formData.address.state,''):''} disabled /></td>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>District :  </label></td>
                        <td className='p-1'> <input type="text" className='form-control float-start '
                            id="district"
                            name="district"
                            style={{ width: '100%' }}
                            value={_.defaultTo(formData.district,'')} disabled /></td>
                    </tr>
                    <tr className='p-1'>
                        <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Station :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='station'
                            id='station'
                            style={{ width: '230px' }}
                            value={_.defaultTo(formData.station,'')} disabled /></td>
                       
                       <td className=' p-1 tcx-form-label'><label className='form-label float-end'>Zone :  </label></td>
                        <td className='p-1'> <input type="text"
                            className='form-control float-start '
                            name='zone'
                            id='zone'
                            style={{ width: '230px' }}
                            value={_.defaultTo(formData.zone,'')} disabled /></td>
                    </tr>
                
                </tbody>
                </table>
                <div className='row mt-5'>
                                <Tabs onChange={callback} defaultActiveKey='1' type="card">
                                    <TabPane tab="Checklist (Attachments)" key="1">
                                        <div className='row'>

                                            <div className='col px-5'>
                                                {/* <Activities show={false} emp={emp_no} /> */}
                                                <ChecklistUpload empNumber={formData.id} hide={true}/>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Contacts" key="2">
                                        <div className='row'>


                                            <div className='col px-5'>
                                                <Contacts empNumber={formData.id} hide={true}/>

                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Addresses" key="3">
                                        <div className='row'>

                                            <div className='col px-5'>
                                                <Address empNumber={formData.id} hide={true}/>

                                            </div>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
        </div>
    );
}

export default EmployerFormView;