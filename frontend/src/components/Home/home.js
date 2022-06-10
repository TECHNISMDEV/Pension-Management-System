import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { t_date } from '../../utils/commons'
import Service_request from './service_request'
function Home() {

  const { isLoggedIn } = useSelector(state => state.AuthReducer);
  const [username, setUsername] = useState("demo");
  const user_data = useSelector(state => state.AuthReducer).user;



  useEffect(() => {

    setUsername(user_data.firstName + ' ' + user_data.lastName)
   

  }, [username])

  return (
    <div className="container-fluid h-100 p-0">
      <div className="p-3">
      <div className="row p-3">
        <div className="card">
          <div className="card-body">
            <span className="lead fs-2"><h3 className="card-title">Welcome, {username}</h3>
            </span>
            <small className=" text-muted fs-5 lead"> Today is {t_date().day + ', ' + t_date().date + ' ' + t_date().text_month + ' ' + t_date().year}</small>
          </div>
        </div>
      </div>
      </div>
     
     <Service_request/>
    </div>
  )
}

export default Home
