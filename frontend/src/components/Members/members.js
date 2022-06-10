import React from 'react'
import 'antd/dist/antd.css';

import { Tabs } from 'antd';
import Member_registeration from './member_registration'
function Members() {
const { TabPane } = Tabs;

function callback(key){

}

    return (
        <div className='p-3'> 

        <div class="card">
          <div class="card-body">
          <Tabs onChange={callback} defaultActiveKey='2' type="card">
            <TabPane tab="Member List" key="1">
            </TabPane>
            <TabPane tab="Member Registration" key="2">
             <Member_registeration/>
            </TabPane>
          </Tabs>
          </div>
        </div>
                    
        </div>
    )
}

export default Members