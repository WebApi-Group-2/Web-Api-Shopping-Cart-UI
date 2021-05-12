import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";
import {Route,Switch} from 'react-router-dom';
import Navbar from './customerNavbar/navbar';
import Customcart from './CustomerCart/customercart';
import CustomItemDetails from './CustomerCart/itemsDetails';
import QtyEdit from './CustomerCart/itemQtyEdit';
import CustomerHome from './CustomerCart/customerHome';
import HeaderMiddle from './customerNavbar/header';
import Footer from './customerNavbar/footer';

class cusomerDashboard extends Component {

     render() {

        return(
           <div>
         <Navbar/>
         <HeaderMiddle/>

         <Switch>
         <Route  path='/' exact component = {CustomerHome}/>
          <Route  path='/cart' exact component = {Customcart}/>
          <Route  path='/cart/:id' exact  component = {CustomItemDetails}/>
          <Route  path='/cart/qtyedit/:id' exact  component = {QtyEdit}/> 
         </Switch>
         <Footer/>
  </div> 
         

        )
         
     }

}

export default cusomerDashboard;