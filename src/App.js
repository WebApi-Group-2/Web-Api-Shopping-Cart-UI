import React,{Component,useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import useToken from './components/useToken'
import Admindashboard  from './components/Admin Components/dashboard';
import Customerdashboard  from './components/CustomerDashboard/cusomerDashboard';
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Admin Components/navbar";
import Items from "./components/Admin Components/items";
import Categories from "./components/Admin Components/categories";
import Users from "./components/Admin Components/users";
import Orders from "./components/Admin Components/orders";
import Footer from "./components/Admin Components/footer";




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
      return(
        <BrowserRouter>
    <NavBar/>
    <Route exact path="/" component={Admindashboard}/>
    <Route exact path="/items" component={Items}/>
    <Route exact path="/categories" component={Categories}/>
    <Route exact path="/users" component={Users}/>
    <Route exact path="/orders" component={Orders}/>
    <Footer/>
    </BrowserRouter>
      );
    }
    else
    {
      return <Customerdashboard/>
    }

  }


}

export default App;


