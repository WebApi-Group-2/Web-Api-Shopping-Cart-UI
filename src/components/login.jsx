import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component,useState} from "react";
import axios from "axios";
import PropTypes from 'prop-types';







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
    <div className = "container">
    <form onSubmit = {handleSubmit}>
      <h1>This is login page</h1><br></br>

      <input type="text" placeholer = "email" onChange={e => setUserName(e.target.value)} /><br></br>
      <input type="text" placeholer = "password" onChange={e => setPassword(e.target.value)} /><br></br><br></br>
      <button type="submit" className="btn btn-primary" >Login</button>
   </form>
   </div>

  );


}


Login.prototype = {
  setToken: PropTypes.func.isRequired,
  
}


  
  export default Login;