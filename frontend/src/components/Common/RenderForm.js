import React, { useState } from 'react';

function RenderFormLayout(props) {
    const[data,setData]= useState(props.data)
    return (
        <div>
               <table>
                <tbody className='fs-6'>

                    {
                        data.map((row,index) => (
                            <tr className='p-1' key={index}>
                                {row[0].id ? <> <td className='p-1 tcx-form-label'><label className='form-label float-end'>{row[0].label} :</label></td>
                                    <td className='p-1' colSpan={row[0].colSpan}>
                                        <input type={row[0].type} className='form-control float-start '
                                            id={row[0].id}
                                            name={row[0].id}
                                            style={{ width: '100%' }}
                                            disabled={row[0].isDisable} />
                                    </td> </>:null}
                                {row[1].id ? <> <td className='p-1 tcx-form-label'><label className='form-label float-end'>{row[1].label} :</label></td>
                                    <td className='p-1' colSpan={row[1].colSpan}>
                                        <input type={row[1].type} className='form-control float-start '
                                            id={row[1].id}
                                            name={row[1].id}
                                            style={{ width: '100%' }}
                                            disabled={row[1].isDisable} />
                                    </td> </>:null}
                                {row[2].id ? <><td className='p-1 tcx-form-label'><label className='form-label float-end'>{row[2].label} :</label></td>
                                    <td className='p-1' colSpan={row[2].colSpan}>
                                        <input type={row[2].type} className='form-control float-start '
                                            id={row[2].id}
                                            name={row[2].id}
                                            style={{ width: '100%' }}
                                            disabled={row[2].isDisable} />
                                    </td>
                                </>:null}
                                {row[3].id ? <>  <td className='p-1 tcx-form-label'><label className='form-label float-end'>{row[3].label} :</label></td>
                                    <td className='p-1' colSpan={row[3].colSpan}>
                                        <input type={row[3].type} className='form-control float-start '
                                            id={row[3].id}
                                            name={row[3].id}
                                            style={{ width: '100%' }}
                                            disabled={row[3].isDisable} />
                                    </td></>:null}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
        </div>
    );
}

export default RenderFormLayout;