import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios, { post } from 'axios';
import { Router, Route, Switch } from "react-router";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null,
      value: ''
    }
  }
  render() {
    return (
      <>
        <div class="btn-group" role="group" aria-label="Return">
          <button type="button" className="btn btn-danger float-end rounded-pill" style={{ "top": "9px", "left": "4px" }} >Validate</button>
        </div>
        <div class="btn-group" role="group" aria-label="Return">
          <button type="button" className="btn btn-danger float-end rounded-pill" style={{ "top": "9px", "left": "13px" }} >Import Returns</button>
        </div>
        <div class="btn-group" role="group" aria-label="Return">
          <button type="button" className="btn btn-danger float-end rounded-pill" style={{ "top": "9px", "left": "21px" }} >Cancel Returns</button>
        </div>
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
              <th scope="col">Proicessing Centre</th>
              <th scope="col">Date Validated</th>
              <th scope="col">Return Total</th>
              <th scope="col">Members Count</th>
              <th scope="col">Date Cancel</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
              <td>0000</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}


export default Grid;
