import React from 'react'


import { Tabs } from 'antd';
import Employer_register from './employer_register'
import Member_register from './member_register';
import styles from '../../asset/css/ant.css'
import ServiceRegistration from './serviceRegistration';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import ServiceMemberRegistration from './serviceMemberRegistration';
const { TabPane } = Tabs;





function Service(props) {
  const location = useLocation()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const term = queryParams.get("type")

  const [activeTab,setActiveTab] = useState('1')

  useEffect(()=>{
    if(term === 'MR'){
      setActiveTab('2')
    }
  },[])

  function callback(key) {
    setActiveTab(key)
    history.push({ pathname: "/dashboard/service",search:key == '1'?'type=SR':'type=MR'});
  }
    return (
        <div className='p-2'> 

<div class="card">
  <div class="card-body">
  <Tabs activeKey={activeTab} onChange={callback} type="card">
    <TabPane className= {styles.sub_tabs} tab="Employer Registration" key="1">
      <Employer_register id={props.id}/>
    {/* <ServiceRegistration id={props.id}/> */}
    </TabPane>
    <TabPane tab="Member Registration" key="2">
      {/* <Member_register/> */}
      <ServiceMemberRegistration/>
    </TabPane>
  </Tabs>
  </div>
</div>
            
        </div>
    )
}

export default Service
