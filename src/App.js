import React,{Component,useState} from "react";

import useToken from './components/useToken'
import Admindashboard  from './components/Admin Components/AdminDashboard';
import Customerdashboard  from './components/CustomerDashboard/cusomerDashboard';
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";




function getuserType() {

  const tokenString = sessionStorage.getItem('UserType');
        const userToken = JSON.parse(tokenString);
        return userToken
}



function App() {
  const {token,setToken} = useToken();

  

  const userty = getuserType();
  

  if(!token){
    return (<Login setToken = {setToken}  />)
  }

  else
  {
    if (userty == '1')
    {
      return <Admindashboard/>
    }
    else
    {
      return <Customerdashboard/>
    }

  }


}

export default App;


