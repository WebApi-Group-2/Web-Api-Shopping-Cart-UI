import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Customercartitems from './cartitems'
import axios from 'axios';

class customercart extends Component {
   
    state = {
        userOrders:[],
    }



  render() {
    return (
      <div
        className="container"
        style={{ backgroundColor: "white", marginTop: "10px" }}
      >
        <div className="card text-center">
  <div className="card-header"   style={{ backgroundColor: "#138D75", color:"white" }}>
    YOUR CART ITEMS
  </div>
  <div className="card-body" style={{ backgroundColor: "#F4F6F6", color:"white" }}>
      <div className='row'>
          {this.state.userOrders.map((orders) =>(
            
            <div key = {orders.id} className='col-sm-3'>
          <Customercartitems key = {orders.id} Total={orders.TotalAmount} Date = {orders.date} Status = {orders.Status} orderId = {orders.id}/>
             </div>   

          ))};
          
      </div>
     
  </div>
  <div className="card-footer text-muted">
    
  </div>
</div> 
      </div>
    );
  }


  async componentDidMount() {

  

    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const token = {Token:userToken};

    

    const {data} = await axios.get("http://localhost:5000/api/order/getorders/",{params: {token:userToken}});
   const maped = data.map(orders => {
        return{
           id : orders._id,
           Status : orders.Status,
           TotalAmount: orders.TotalAmount,
           date: orders.date


        }
    });

    this.setState({userOrders:maped});


    

  }


}

export default customercart;
