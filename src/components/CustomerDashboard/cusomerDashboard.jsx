import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";
import {Route,Switch} from 'react-router-dom';
import Navbar from './customerNavbar/navbar';
import Customcart from './CustomerCart/customercart';
import CustomItemDetails from './CustomerCart/itemsDetails';
import QtyEdit from './CustomerCart/itemQtyEdit';
import CustomerHome from './CustomerCart/customerHome';

class cusomerDashboard extends Component {

     render() {

        return(
           <div>
         <Navbar/>

         <Switch>
         <Route  path='/' exact component = {CustomerHome}/>
          <Route  path='/cart' exact component = {Customcart}/>
          <Route  path='/cart/:id' exact  component = {CustomItemDetails}/>
          <Route  path='/cart/qtyedit/:id' exact  component = {QtyEdit}/> 
         </Switch>
  </div> 
         

        )
         
     }

}

export default cusomerDashboard;