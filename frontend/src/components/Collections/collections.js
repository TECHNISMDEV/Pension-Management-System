import { React, useState, useEffect, useMemo } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Tabs } from 'antd';
import { useFormik, Field, FormikProvider } from 'formik';
import axios from 'axios';
import { API_URL, formatDate } from '../../utils/commons';
import { useTable } from 'react-table'
import { Modal } from 'antd';
import { setsubmitpayment } from '../../utils/commons'
import { Redirect } from 'react-router';
const { TabPane } = Tabs;

function Collections() {
    const [enableManRecep, setEnableManRecep] = useState(true)
    const [trans_Type, settrans_Type] = useState('')
    const [isnew, setisnew] = useState(true)
    const [emp_no, setemp_no] = useState('')
    const [emp_name, setemp_name] = useState('')
    const [reg_date, setreg_date] = useState('')
    const [address, setaddress] = useState('')
    const [login_user, setlogin_user] = useState('')
    const [subm, setsubm] = useState('')
    const [status, setstatus] = useState('')
    const [amt_paid, setamt_paid] = useState()
    const [amt_due, setamt_due] = useState()
    const [proc_cent, setproc_cent] = useState('')
    const [ret_total, setret_total] = useState(0)
    const [responseData, setresponseData] = useState([])
    const [payments, setpayments] = useState([])
    const [payment_trans, setpayment_trans] = useState([])
    const [returns, setreturns] = useState([])
    const [addpayment, setaddpayment] = useState(false)
    const [addpayment_type, setaddpayment_type] = useState('')
    const [addpayment_amt, setaddpayment_amt] = useState()
    const [addpayment_cashcode, setaddpayment_cashcode] = useState('')
    const [addpayment_sub_no, setaddpayment_sub_no] = useState('')
    const [isEmployersearch, setisEmployersearch] = useState(false)
    useEffect(() => {
        if (!ret_total == 0) {
            setamt_due(ret_total)
            //setamt_paid(responseData.reduce((a, b) => a = a + parseInt(b.payments[0].amount), 0))

        }




    }, [ret_total,payments])


    const formik = useFormik({
        initialValues: {
            trans_type: trans_Type,
            emp_no: emp_no ? emp_no : '',
            subm_no: subm ? subm : '',
            date_received: reg_date,
            status: status,
            address: address,
            login_user: login_user,
            emp_name: emp_name,
            amt_paid: amt_paid,
            amt_due: amt_due,
            proc_cent: proc_cent,
            addpayment_type: addpayment_type,
            addpayment_amt: addpayment_amt,
            addpayment_cashcode: addpayment_cashcode,
            addpayment_sub_no: addpayment_sub_no

        },
        enableReinitialize: true,
        onSubmit: values => {
            //dispatch(register_sr_employer(values))]

        },
        onChange: values => {

            formik.setValues(values)


        }
    })



    const searchbyemp = (e) => {
        e.preventDefault();
        axios.post(API_URL + "/getByRetCompanyID/" + formik.values.emp_no).then(
            res => {
                if(!res.data.length==0){
                setisEmployersearch(true)
                setresponseData(res.data)
                setemp_name(res.data[0].returns.company.name)

                setreg_date(formatDate(res.data[0].returns.collection.created))
                setemp_no(res.data[0].returns.company.id)
                setstatus(res.data[0].returns.collection.status)
                setaddress(res.data[0].returns.company.address.adressLine1 + ' ' + res.data[0].returns.company.address.adressLine2)
                setlogin_user(res.data[0].returns.collection.craeatedBy)

                setproc_cent('20')

                //setpayments(res.data[0].payments),
                console.log(res.data)
                // res.data.map((pay) => (
                //     console.log(pay.payments[0]),
                //     add_payment_data(pay.payments[0])
                //     //setpayments(payments.push(pay.payments)),
                //     //setlist_subm_no(list_subm_no.concat(pay.returns.submissionNo))
                // )),
                //setpayments(payments.concat(res.data[0].payments)),
               
                }else{
                    alert("No Payable Return Data!!")
                }
             } )
    }
    const searchbysubm = (e) => {
        e.preventDefault();
        //setEmpNumb(formik.values.subm_no)
        console.log(formik.values.subm_no)
        axios.post(API_URL + '/getByRetSubmissionNo/' + formik.values.subm_no).then(
            res => {
                if(res.data[0]){
                console.log(res.data)
                setemp_name(res.data[0].returns.company.name)

                setreg_date(formatDate(res.data[0].returns.collection.created))
                setemp_no(res.data[0].returns.company.id)
                setstatus(res.data[0].returns.collection.status)
                setaddress(res.data[0].returns.company.address?res.data[0].returns.company.address.adressLine1 + ' ' + res.data[0].returns.company.address.adressLine2:'')
                setlogin_user(res.data[0].returns.collection.craeatedBy)
                setsubm(res.data[0].returns.collection.submissionNo)
                setproc_cent('20')
                //setamt_due((res.data[0].returns.damount).toFixed(2))
                //setpayments(res.data[0].payments),
                setreturns(returns.concat(res.data[0].returns))
                console.log(returns)
                //setamt_paid((res.data[0].returns.retPaidAMT + res.data[0].returns.penPaidAMT).toFixed(2))
                setresponseData(res.data)
                console.log(payments)
                }
                else{
                    alert("No Payable Return Data!!")
                }

            })
        
    }
 
  
    const handlenewentry = (e) => {
        e.preventDefault()
        setisnew(false)
        settrans_Type('OTC')
    }

    const calcu_ret_total = (e) => {
        e.preventDefault()

        setret_total((responseData.reduce((a, v) => v.returns ? a = a + v.returns.treturnAmount + v.returns.pamount : '', 0)))

        // responseData.map((ret)=>(
        //         console.log(ret.returns.treturnAmount+ret.returns.pamount),
        //         setret_total(ret_total+ret.returns.treturnAmount+ret.returns.pamount)
        //         //setret_total((ret_total + ret.returns.treturnAmount + ret.returns.pamount))

        // ))

        //console.log(ret_total)

    }
    const handleaddpaymentOk = () => {
        setaddpayment(false);
        if(!(parseInt(formik.values.addpayment_amt)<amt_due)){
        // setresponseData(responseData.concat([{
        //     'returns': null,
        //     'payments': [
        //         {
        //             'amount': formik.values.addpayment_amt,
        //             'id': "",
        //             'collection': { 'submissionNo': formik.values.addpayment_sub_no },
        //             'payment_Type': formik.values.addpayment_type
        //         }
        //     ]
            
        // }]))
        payment_trans.push(
            {
                "payments_type":formik.values.addpayment_type,
                "subm_no":formik.values.addpayment_sub_no,
                "amt":formik.values.addpayment_amt
            }
        )
    setaddpayment_sub_no(' ')
    setaddpayment_type('')
    setaddpayment_amt('')
    setaddpayment_cashcode('')
    }else{
        setaddpayment_sub_no(' ')
    setaddpayment_type('')
    setaddpayment_amt('')
    setaddpayment_cashcode('')
        alert("The entered amount is less than Due amount!!")
    }
    };

    const handleaddpaymentCancel = () => {
        setaddpayment(false);
    };
    const handleaddpayments = () => {
        setaddpayment(true)


    }

    const handlepaymentreset = ()=>{
        setpayment_trans([])
    }

    const handleSubmitPayment = () => {
        var form_data = null
        
       form_data=setsubmitpayment(responseData,payment_trans)
        console.log(form_data)
        axios.post(API_URL + '/submitPayment/',form_data).then(
            (res)=>(
                console.log(res),
                alert("Successfully paid!!")
            )
        )
    }
    return (
        <div className="p-3">
        <div className="row px-3">

            <div className="card" >
                <div className="card-body">
                    <p className="card-title fs-3 mb-3">Collections</p>

                    <button type="button" className="btn btn-danger float-end rounded-pill mx-2" onClick={handleSubmitPayment} disabled={payment_trans.length==0?true:false}>Submit Payment</button>
                    <button type="button" className="btn btn-danger float-end rounded-pill mx-2" onClick={(e) => window.location.reload()}>Reset</button>
                    <button type="button" className="btn btn-danger float-end rounded-pill mx-2" onClick={(e) => handlenewentry(e)}>+ Add</button>
                </div>

                <FormikProvider value={formik}>
                    <Modal title="Add Payment" visible={addpayment} onOk={handleaddpaymentOk} onCancel={handleaddpaymentCancel}>
                        <table>
                            <tbody>
                                <tr>
                                    <td> <label class="form-label float-end">Payment Type : </label></td>
                                    <td><Field component="select" name="addpayment_type" id="addpayment_type" value={formik.values.addpayment_type} className={"form-control float-start mx-2"} style={{ width: '230px' }} onChange={formik.handleChange}>
                                        <option value=" " display='none'></option>
                                        <option value="Cash">Cash</option>
                                        <option value="Cheque">Cheque</option>

                                    </Field></td>
                                </tr>
                                {/* <tr>
                                    <td> <label class="form-label float-end">Submission No : </label></td>
                                    <td><Field component="select" name="addpayment_sub_no" id="addpayment_sub_no" value={formik.values.addpayment_sub_no} className={"form-control float-start mx-2"} style={{ width: '230px' }} onChange={formik.handleChange} disabled={isEmployersearch}>
                                        <option value=" " display='none'></option>
                                        {responseData && responseData.map((sub) => (sub.returns ?
                                            <option value={sub.returns.submissionNo}>{sub.returns.submissionNo}</option> : null
                                        ))}

                                    </Field></td>
                                </tr> */}
                                <tr>
                                    <td> <label class="form-label float-end">Amount : </label></td>
                                    <td><input type="text"
                                        className='form-control float-start mx-2'
                                        id="addpayment_amt"
                                        name="addpayment_amt"
                                        style={{ width: '230px' }}
                                        value={formik.values.addpayment_amt} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td> <label class="form-label float-end">Cash Code : </label></td>
                                    <td><input type="text"
                                        className='form-control float-start mx-2'
                                        id="addpayment_cashcode"
                                        name="addpayment_cashcode"
                                        style={{ width: '230px' }}
                                        defaultValue={formik.values.addpayment_type == 'Cash' ? 'S999' : ''} onChange={formik.handleChange} /></td>
                                </tr>

                            </tbody>
                        </table>
                    </Modal>
                    <form onSubmit={formik.handleSubmit}>
                        <table>
                            <tbody>
                                <tr >
                                    <td className='p-1'><label className='form-label float-end'>Transaction Type: </label></td>
                                    <td className='p-1'>
                                        <Field component="select" id="trans_type" value={formik.values.trans_type} className={"form-control float-start"} onChange={formik.handleChange} disabled={isnew} required>
                                            <option value=" " display='none'></option>
                                            <option value="OTC">OTC</option>
                                            <option value="Manual">Manual</option>

                                        </Field></td>
                                    <td className='p-1'><label className='form-label float-end'>Employer No#: </label></td>
                                    <td className='p-1'>
                                        <input className="form-control float-start" id='emp_no' placeholder="Search by employer no" style={{ width: '230px' }} defaultValue={formik.values.emp_no} onChange={formik.handleChange} disabled={isnew}></input>
                                        <a className="p-0 mx-1" type="button" onClick={searchbyemp}>
                                            <AiOutlineSearch style={{ padding: '0px' }} size={30} color={'black'} />
                                        </a>
                                    </td>
                                    <td className='p-1'><label className='form-label float-end'>Submission No#: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" id='subm_no' name='subm_no' placeholder="Search by Sub. no" style={{ width: '230px' }} defaultValue={formik.values.subm_no} onChange={formik.handleChange} disabled={isnew}></input>
                                        <a className="p-0 mx-1" type="button" onClick={searchbysubm}>
                                            <AiOutlineSearch style={{ padding: '0px' }} size={30} color={'black'} />
                                        </a>
                                    </td>

                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Date Received: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.date_received} name='date_received' id='date_received' onChange={formik.handleChange} disabled></input></td>
                                    <td className='p-1'><label className='form-label float-end'>Employer Name: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.emp_name} name='emp_name' id='emp_name' onChange={formik.handleChange} disabled></input></td>
                                    <td className='p-1'><label className='form-label float-end'>Amount Paid: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.amt_paid} name='amt_paid' id='amt_paid' onChange={formik.handleChange} disabled></input></td>
                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Date Printed: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.date_received} name='date_received' id='date_received' onChange={formik.handleChange} disabled></input></td>
                                    <td className='p-1'><label className='form-label float-end'>Employer Address: </label></td>
                                    <td className='p-1'> <textarea className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.address} name='address' id='address' onChange={formik.handleChange} disabled></textarea></td>
                                    <td className='p-1'><label className='form-label float-end'>Amount Due: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.amt_due} name='amt_due' id='amt_due' onChange={formik.handleChange} disabled></input></td>
                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Processing Center: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.proc_cent} disabled></input></td>
                                    <td className='p-1'><label className='form-label float-end'>Status: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.status} name='status' id='status' onChange={formik.handleChange} disabled></input></td>

                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Login User: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.login_user} name='login_user' id='login_user' onChange={formik.handleChange} disabled></input></td>

                                </tr>
                                <tr>
                                    <td className='p-1'><label className='form-label float-end'>Manual Receipt: </label></td>
                                    <td className='p-1'> <input className="form-control float-start" style={{ width: '230px' }} defaultValue={formik.values.man_rec} name='man_rec' id='man_rec' onChange={formik.handleChange} disabled={formik.values.trans_type == 'Manual' ? false : true} ></input></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className='row p-2 mt-5'>
                            <Tabs defaultActiveKey="1" type="card">
                                <TabPane tab="Returns" key="1">
                                    <div className="row">
                                        <p className="card-title fs-3 mb-3 d-inline">Returns</p>





                                    </div>
                                    <div className='row'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <button type="button" className="btn btn-danger float-start rounded-pill mx-3" style={{ width: '190px' }} disabled>Calculate Selected</button>

                                                        <button type="button" className="btn btn-danger float-start rounded-pill mx-3" style={{ width: '190px' }} onClick={calcu_ret_total}>Calculate All</button>

                                                        <button type="button" className="btn btn-danger float-start rounded-pill mx-3" style={{ width: '190px' }} disabled>Remove Return</button>
                                                        <p className='form-label fs-5 fw-bold mx-5 float-start' style={{ display: ret_total ? 'block' : 'none' }}>Total :- {amt_due ? amt_due : ret_total}</p>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>




                                    </div>
                                    <div className='row m-3'>
                                        <div style={{maxHeight:'200px',overflow:'auto'}}>
                                        <table class="table table-striped">
                                            <thead class="thead-dark" style={{position: 'sticky', top: '0'}}>
                                                <tr>
                                                    <th scope="col">Submission No</th>
                                                    <th scope="col">Year</th>
                                                    <th scope="col">Month</th>
                                                    <th scope="col">Returns Total</th>
                                                    <th scope="col">Penalty</th>

                                                    <th scope="col">Full/Partial Amount</th>
                                                    <th scope="col">Balance</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Payment Id</th>
                                                    <th scope="col">Return Paid</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {responseData && responseData.map((key, i) => (key.returns ?
                                                    
                                                    <tr key={key}>
                                                        <td>
                                                            {key.returns.submissionNo}
                                                        </td>
                                                        <td>
                                                            {key.returns.year}
                                                        </td>
                                                        <td>
                                                            {key.returns.month}
                                                        </td>
                                                        <td>
                                                            {key.returns ? key.returns.treturnAmount : 0}
                                                        </td>
                                                        <td>
                                                            {key.returns ? key.returns.pamount : 0}
                                                        </td>

                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            {key.returns.status == 'Completed' ? 'Ready to pay' : key.returns.status}
                                                        </td>
                                                        <td>
                                                            {key.payments.id}
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>



                                                    </tr> : ''
                                                ))}
                                            </tbody>
                                        </table>
                                        </div>


                                    </div>
                                </TabPane>
                                <TabPane tab="Payment Mode" key="2">
                                    <div className="row p-3">
                                        <p className="card-title fs-3 mb-3">Payments</p>
                                        <button type="button" className="btn btn-danger float-end rounded-pill mx-2" style={{ width: '150px' }} onClick={handleaddpayments} disabled={amt_due?false:true}>+ Add</button>
                                        <button type="button" className="btn btn-danger float-end rounded-pill mx-2" style={{ width: '150px' }} onClick={handlepaymentreset} disabled={isnew}>Reset</button>
                                    </div>
                                    <div className='row m-3'>
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <td>Payment Mode</td>
                                                    <td>Amount</td>
                                                    <td>Cash Code</td>
                                                    <td>Bank Code</td>
                                                    <td>Bank Name</td>
                                                    <td>Branch Name</td>
                                                    <td>Cheque No</td>
                                                    <td>Cheque Received</td>
                                                    <td>EFT Bank Code</td>
                                                    <td>EFT Bank Name</td>
                                                    <td>Town</td>
                                                    <td>Payment Id</td>

                                                </tr>

                                            </thead>
                                            <tbody>
                                                {payment_trans && payment_trans.map((payt) => (
                                                    <tr key={payt}>
                                                        <td>
                                                            {payt.payments_type}
                                                        </td>
                                                        <td>
                                                            <input className='form-control h-50 w-50' type='text' defaultValue={payt.amt} disabled={payt.amt ? true : false} />
                                                        </td>
                                                        <td>
                                                            {payt.payments_type == 'Cash' ? 'S999' : ''}
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            { }
                                                        </td>
                                                        <td>
                                                            {payt.id}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </form>
                </FormikProvider>
            </div>
        </div>
        </div>
    )
}

export default Collections