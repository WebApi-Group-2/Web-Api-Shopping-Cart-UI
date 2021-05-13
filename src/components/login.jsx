import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component,useState} from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import "./login.css"
import logo from './CustomerDashboard/customerNavbar/logo3.png';
import HeaderMiddle from './CustomerDashboard/customerNavbar/header';
import Footer from './CustomerDashboard/customerNavbar/footer';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';



function Login ({setToken}) {

  const facebooklogin = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/facebooklogin",
      data: {accessToken: response.accessToken, userID: response.userID}
    }).then(response => {
      console.log("Facebook login success", response);
    })
  }

  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/googlelogin",
      data: {tokenId: response.tokenId}
    }).then(response => {
      console.log("Google login success", response);
    })
  }
  const responseErrorGoogle = (response) => {
    
  }

   const responseFacebook = (response) => {
    
  }

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
    <div>
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

      <HeaderMiddle/>
        <div class="container-xxl" style={{backgroundColor:"#1877f2", height:"80px", display:"flex", alignItems:"center", justifyContent:"center"}}>
          
          <div className="header" style={{color:"#ffffff", fontWeight:"400"}}>Create New Account</div>
       <div className="nav" style={{marginleft:"auto",marginRight:"60px"}}>
                  <li className="nav">
                      <input className="form-control" type="text" style={{marginTop:"3px",marginLeft:"0.625rem"}} placeholder="Name"/> 
                  </li>
                  <li className="nav">
                      <input className="form-control" type="email" style={{marginTop:"3px",marginLeft:"0.625rem"}} placeholder="Email"/> 
                  </li>
                  <li className="nav">
                      <input className="form-control" type="password" style={{marginTop:"3px",marginLeft:"0.625rem"}} placeholder="Password"/> 
                  </li>
                  <li className="nav">
                    <button className="btn btn-dark" type="submit" style={{marginLeft:"0.625rem", marginRight:"0.625rem"}}>SignUp</button>
                  </li>
                  
                                      
                      <GoogleLogin
                        clientId="212464559860-30tq5g85gv1pjfhkd172iagcuud1a8e6.apps.googleusercontent.com"
                        
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        redirectUri={'http://localhost:5000/api/auth/'}
                        cookiePolicy={'single_host_origin'}
                        cssClass="btnGoogle"
                      />
                      <FacebookLogin
                        appId="256103489627680"
                        buttonText="Facebook"
                        autoLoad={true}
                        cssClass="btnFacebook"
                        
                        callback={responseFacebook} />
                      
                      
                    
                </div>
</div>
        

       <Footer/>
       </div>
  );


}


Login.prototype = {
  setToken: PropTypes.func.isRequired,
  
}

export default Login;