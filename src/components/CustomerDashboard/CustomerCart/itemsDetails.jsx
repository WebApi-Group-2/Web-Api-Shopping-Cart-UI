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
  } 

    this.handleChange = this.handleChange.bind(this);
    this.addressuodate = this.addressuodate.bind(this);
}

  



handleChange(event) {
  this.setState({shippingAddress: event.target.value});
}
   
    



  render() {

    return (

      <div className='container' style={{ backgroundColor: "white", marginTop: "10px" }}>

        <div className="card text-center">
        <div className="card-header">
       <h4>Update Shipping Address:</h4>

        <div className= 'row'>

         
          

          <input className="form-control" type="text" value={this.state.shippingAddress} placeholder="Shipping Address" onChange={this.handleChange}/> <br></br><br></br>
          <button className = "btn btn-warning" onClick = {this.addressuodate}>Update</button>
         
          
         
          
        </div>
         
        </div>
        <div className="card-body" style={{ backgroundColor: "#EDBB99", marginTop: "10px" }}>

        <table className="table">
  <thead className="thead-dark">
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
            
            
          <Itemcell key = {orders.id} Photo={orders.ImageURL} Name = {orders.name} Qty = {orders.qty} UnitPrice = {orders.unitPrice} Total = {orders.Total} id={orders.id}/>
           

  ))}
   </React.Fragment>

  </tbody>
</table>


           
        </div>
        <div className="card-footer text-muted" style={{ backgroundColor: "#E5E7E9 ", color:"white"}}>

          <div className='row'>
            <h5>Total Amount : Rs. {this.state.totalAmount}</h5>
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

    

    

  }


  



  


}

export default itemDetails;
