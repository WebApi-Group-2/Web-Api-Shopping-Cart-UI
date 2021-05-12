import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component,useState} from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import "./login.css"
import logo from './CustomerDashboard/customerNavbar/logo3.png';


function Login ({setToken}) {

  const [username,setUserName] = useState();
  const [password,setPassword] = useState();

 const handleSubmit = async e => {
   e.preventDefault();

   const cre = {email:username, password: password};

   
   postuser(cre);

 }


 async function postuser(creden){

  const respon = await axios.post('http://localhost:5000/api/auth/login',creden);

  sessionStorage.setItem('UserType',JSON.stringify(respon.data.IsAdmin));
       
  setToken(respon.data.Token);

}


  return (
        <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor: "#000000"}}>
          <a className="navbar-brand" ><img src={logo} style={{width: "auto" , height: "auto" }}/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <form className="d-flex" onSubmit = {handleSubmit}>
              <input className="form-control form-control-sm" style={{marginRight: "10px"}} type="text" placeholder="Email" onChange={e => setUserName(e.target.value)} aria-label="Email" required></input>
              <input className="form-control form-control-sm" style={{marginRight: "10px"}} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} aria-label="Password" required></input>
              <button className="btn btn-sm btn-dark" type="submit">Login</button>
            </form>
          </div>
       </nav>
  );


}


Login.prototype = {
  setToken: PropTypes.func.isRequired,
  
}

export default Login;