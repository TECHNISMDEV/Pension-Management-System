import React from 'react'


import { Tabs } from 'antd';
import Employer_register from './employer_register'
import Member_register from './member_register';
import styles from '../../asset/css/ant.css'
const { TabPane } = Tabs;

function callback(key) {
  
}

function Service() {
    return (
        <div className='p-3'> 

<div class="card">
  <div class="card-body">
  <Tabs onChange={callback} type="card">
    <TabPane className= {styles.sub_tabs} tab="Employer Registration" key="1">
      <Employer_register/>
    </TabPane>
    <TabPane tab="Member Registration" key="2">
      <Member_register/>
    </TabPane>
  </Tabs>
  </div>
</div>
            
        </div>
    )
}

export default Service
