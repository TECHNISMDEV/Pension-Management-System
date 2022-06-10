import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios, { post } from 'axios';
import { formatDate } from '../../utils/commons'
import { MicNone } from "@material-ui/icons";


class Return extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null,
      value: '',
      file: null,
      returns: [],
      returnItems: [],
      bgColor: "",
      returnItemId: "",
      ValidatedItems: [],
      isselected_retid:'',
      validated:[]
    }
    this.returnItemTable = this.returnItemTable.bind(this);
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  Validate = () => {

    axios({
      url: 'http://localhost:8080/app/validate/'+this.state.returnItemId,
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then((res => {
      const ValidatedItems = res.data.items;
      this.setState({ returnItems: res.data.items });
      console.log(res.data)
      this.state.validated.push(this.state.returnItemId)
    }))
    this.forceUpdate();
  }

  returnItemTable = (event,key) => {
this.setState({isselected_retid:key})
    this.setState({ bgColor: 'blue' });
    this.setState({returnItemId : key})
     axios({
       url: 'http://localhost:8080/app/getItemsByReturnId/'+key,
       method: 'GET',
       headers: {
         'Access-Control-Allow-Origin': '*'
       },
     }).then((res => {
       const returnItems = res.data;
       this.setState({ returnItems });
       console.log(res.data)
     }))
  }


  importFile = (e) => {
    let file = this.state.file
    let formdata = new FormData()
    formdata.append('file', file)
    formdata.append('msg', 'return .csv file passed to back-end')
    axios({
      url: 'http://localhost:8080/app/file-upload',
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      },
      data: formdata
    }).then((res => {
      const returns = res.data;
      this.setState({ returns });
      if(res.data != null)
                {
                  this.closeModal()
                }
      console.log(res.data)
    }))
  }

  handleFile = (e) => {
    let file_att = e.target.files[0]
    this.setState({ file: file_att })
    console.log(e.target.files[0])
  }
  

  render() {
    return (
        <div className="card" style={{ "top": "12px","left":"13px","width":"98.5%" }} >
        <div className="card-body">
        <p className="card-title fs-3 mb-3">Returns</p>
        {this.state.returns.returns ? '' : <div class="btn-group" role="group" aria-label="Return">
          <button type="button" className="btn btn-danger float-end rounded-pill" onClick={this.openModal} style={{ "top": "9px", "left": "7px" }} >Import Return</button>
        </div>}
        <div class="modal-dialog modal-dialog-centered">
          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Import Returns</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <input type="file" id="myfile" name="myfile" onChange={(e) => this.handleFile(e)} style={{ "padding": "20px" }} />
              <Button variant="primary" className="btn btn-danger float-end rounded-pill" onClick={(e) => this.importFile(e)} >
                Import
            </Button>

              <Button variant="primary" className="btn btn-danger float-end rounded-pill" onClick={this.closeModal}>
                Cancel
            </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          {this.state.returns.returns && <div class="btn-group" role="group" aria-label="Return">
            <button type="button" className="btn btn-danger float-end rounded-pill" style={{ "top": "-6px", "left": "4px" }} onClick={() => this.Validate()} >Validate</button>
          </div>}
          {this.state.returns.returns && <div class="btn-group" role="group" aria-label="Return">
            <button type="button" className="btn btn-danger float-end rounded-pill" style={{ "top": "-6px", "left": "13px" }} >Import Returns</button>
          </div>}
          {this.state.returns.returns && <div class="btn-group" role="group" aria-label="Return">
            <button type="button" className="btn btn-danger float-end rounded-pill" style={{ "top": "-6px", "left": "21px" }} >Cancel Returns</button>
          </div>}
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Submission Number</th>
                <th scope="col">Month(MM)</th>
                <th scope="col">Year(YYYY)</th>
                <th scope="col">Employer No</th>
                <th scope="col">Date Received</th>
                <th scope="col">Financial Year</th>
                <th scope="col">Imported by</th>
                <th scope="col">Processing Centre</th>
                <th scope="col">Date Validated</th>
                <th scope="col">Return Total</th>
                <th scope="col">Members Count</th>
                <th scope="col">Date Cancel</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.returns.returns && this.state.returns.returns.map((key) => (
                <tr key={key.id} onClick={(event) => {this.returnItemTable(event,key.id);this.forceUpdate()}}  style={this.state.isselected_retid==key.id? {backgroundColor:'#f2f2f2'}:{}}>
                  <td>{key ? key.submissionNumber :''}</td>
                  <td>{key ? key.month : ''}</td>
                  <td>{key ? key.year : ''}</td>
                  <td>{key ? key.companyId : ''}</td>
                  <td>{key ? formatDate(key.created) :''}</td>
                  <td></td>
                  <td>{key ? key.id : ''}</td>
                  <td></td>
                  <td></td>
                  <td>{key ? key.totalReturnAmount : ''}</td>
                  <td></td>
                  <td></td>
                  <td>{key && !(this.state.validated.includes(key.id)) ? key.status : 'Validated'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="return-footer" style={{ "padding-top": "327px"}}>
        <p className="card-title fs-3 mb-3">Returns Items</p>
         <table class="table">
            <thead>
              <tr>
                <th scope="col">Provisional Check</th>
                <th scope="col">Social Security Number</th>
                <th scope="col">NRC Number</th>
                <th scope="col">FName</th>
                <th scope="col">Last Name</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Gross Wage</th>
                <th scope="col">Employer Share</th>
                <th scope="col">Employee Share</th>
                <th scope="col">Total Contribution</th>
                <th scope="col">Status</th>
                <th scope="col">Comments</th>
              </tr>
            </thead>
            <tbody>
            {this.state.returnItems && this.state.returnItems.map((key) => (
              <tr key={key.id}>
                <td></td>
                <td></td>
                  <td>{key ? key.memberNrc : ''}</td>
                <td>{key ? key.memFirstName : ''}</td>
                <td>{key ? key.memeLastName : ''}</td>
                <td>{key ? formatDate(key.memberDob) : ''}</td>
                <td></td>
                <td>{key ? key.companyShare : ''}</td>
                <td>{key ? key.memberShare : ''}</td>
                <td></td>
                <td>{key ? key.retur.status : ''}</td>
                <td></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        </div>
    </div>
    );
  }
}


export default Return;
