import React from 'react'
import 'antd/dist/antd.css';

import { Tabs } from 'antd';
import Employer_registration from './employer_registeration'
import EmployerList from './employer_list';
function Employer(props) {
const { TabPane } = Tabs;

function callback(key){

}

    return (
        <div className='p-3'> 

        <div class="card">
          <div class="card-body">
          <Tabs onChange={callback} defaultActiveKey='1' type="card">
            <TabPane tab="Employer List" key="1">
              <EmployerList/>
            </TabPane>
          </Tabs>
          </div>
        </div>
                    
        </div>
    )
}

export default Employer