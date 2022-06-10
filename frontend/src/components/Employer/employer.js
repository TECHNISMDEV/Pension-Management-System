import React from 'react'
import 'antd/dist/antd.css';

import { Tabs } from 'antd';
import Employer_registration from './employer_registeration'
function Employer(props) {
const { TabPane } = Tabs;

function callback(key){

}

    return (
        <div className='p-3'> 

        <div class="card">
          <div class="card-body">
          <Tabs onChange={callback} defaultActiveKey='2' type="card">
            <TabPane tab="Employer List" key="1">
            </TabPane>
            <TabPane tab="Employer Registration" key="2">
            <Employer_registration id={props.id}/>
            </TabPane>
          </Tabs>
          </div>
        </div>
                    
        </div>
    )
}

export default Employer