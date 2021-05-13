import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";
import {Link} from 'react-router-dom';

class cartitems extends Component {

  

     render() {

        return(

            <div className="card shadow-sm" style={{borderBottom:"none"}}>
      
        
   

  <div className="card-body " style={{backgroundColor: "#ffffff", color:"#000000"}} >
    <h5 className="card-title" style={{marginBottom:"0.1rem"}}>Total Amount  OrderNo: {this.props.orderNo} </h5>
    <h5 className="card-title" style={{color:"#ff005c"}}> {this.props.Total} LKR </h5>
    <p className="card-text" style={{fontSize:"0.85rem"}}>You have created this cart on: Status: {this.props.status} <br></br> {this.props.Date}. <br></br> Please check the arraving status.</p>
  </div>
  <ul className="list-group list-group-flush">

  </ul>
  <div className="card-body">
    <Link to = {`cart/${this.props.orderId}`} ><button className ="button btn-sm btn-dark" style={{border:"none"}}>View More</button></Link>
  </div>
    </div>

         
        )
         
     }

     

}

export default cartitems;