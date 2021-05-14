import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

import axios from 'axios';
import Itemcell from './itemdetailtablecell';

class itemDetails extends Component {

  constructor(props) {
    super(props);
   this.state = {
      orderitems:[],
      shippingAddress:String = "Address",
      totalAmount:Number,
      Status:Number,
      StatusName:String,
      btndisable:false,
  } 

    this.handleChange = this.handleChange.bind(this);
    this.addressuodate = this.addressuodate.bind(this);
}

  



handleChange(event) {
  this.setState({shippingAddress: event.target.value});
}
   
    



  render() {

    return (

      <div className="container-xxl" style={{ backgroundColor: "white", marginTop: "10px" ,transform:"none"}}>

        <div className="card text-center" style={{transform:"none"}}>
        <div className="card-header shadow-sm" style={{ fontWeight:"bold", fontSize:"1.1rem", backgroundColor: "#dddddd", color:"black", border:"none", transform:"none"}}>
        Shipping Address
        <div className= 'row'>
        </div>
        </div>
        <ul className="nav" style={{marginRight:"1.25rem", marginLeft:"auto"}}>
          
          <label style={{marginTop:"auto", marginRight:"0.625rem"}}>Update the Address</label>
          <li className="nav">
              <input className="form-control" type="text" style={{float:"right", marginTop:"0.625rem"}} value={this.state.shippingAddress} placeholder="Shipping Address" onChange={this.handleChange}/>
          </li>
          <li className="nav">
            <button className="btn btn-dark" style={{marginLeft:"0.625rem", marginTop:"auto"}} onClick = {this.addressuodate}>Update</button>
          </li>
          
        </ul>
        <div className="card-body" style={{ backgroundColor: "white", marginTop: "0.125rem" }}>

        <table className="table align-middle table-striped">
  <thead className="table-dark">
    <tr>
      
      <th scope="col">Photo</th>
      <th scope="col">Name</th>
      <th scope="col">Qty</th>
      <th scope="col">UnitPrice</th>
      <th scope="col">Total</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody>
  <React.Fragment>
  {this.state.orderitems.map((orders) =>(
            
            
          <Itemcell key = {orders.id} Photo={orders.ImageURL} Name = {orders.name} Qty = {orders.qty} UnitPrice = {orders.unitPrice} Total = {orders.Total} id={orders.id} btndis={this.state.btndisable}/>
           

  ))}
   </React.Fragment>

  </tbody>
</table>


           
        </div>
        <div className="card-footer text-muted" style={{ backgroundColor: "#f8f8f8 ", color:"white"}}>

          <div className='row'>

            <h5 style={{marginLeft:"auto", marginRight:"1.25rem", fontWeight:"bold"}}>Total Amount : {this.state.totalAmount} LKR</h5>

          </div>

          <div className='row'>
            <h5>Status : {this.state.StatusName}</h5>
            </div>
       
        </div>
        </div>

       
      </div>
    
       
      
      
      )
  }


  addressuodate = async() => {

    if (this.state.shippingAddress == "")
    {
      alert('Address field must be filled')
    }
    else
    {

      if(this.state.Status == 2)
      {
        alert("This order has shipped, cannot update shipping address");
      }
      else
      {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
    
        const item = {Token:userToken, AddressShiping: this.state.shippingAddress};
    
        await axios.put(`http://localhost:5000/api/order/updateaddress/${this.props.match.params.id}`, item).then(response => {
          if (response.status == 200)
          {
            alert("successfully updated");
          }
          else {
            alert("somthing went wrong");
          }
      });
      }
      

    }
    
  }


  async componentDidMount() {

    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
   
    let totalfinal = 0;
    

    const {data} = await axios.get("http://localhost:5000/api/order/getselectedorder/",{params: {token:userToken,orderid:this.props.match.params.id}});
   const maped = data[0].itemdetails.map(item => {

      const totalprice = item.qty * item.unitPrice;
      totalfinal = totalfinal + totalprice;
        return{
           id : item._id,
           name : item.name,
           unitPrice: item.unitPrice,
           qty: item.qty,
           ImageURL:item.ImageURL,
           Total : totalprice


        }
    });

     this.setState({shippingAddress:data[0].AddressShiping});
     this.setState({orderitems:maped});
     this.setState({totalAmount:totalfinal});
     this.setState({Status:data[0].Status});

     if(data[0].Status == 1)
     {
      this.setState({StatusName:"Pending"});
     }
     else
     {
      this.setState({StatusName:"Shipped"});
      this.setState({btndisable:true});
     }

    

    

  }


  



  


}

export default itemDetails;
