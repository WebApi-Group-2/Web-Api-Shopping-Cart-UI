import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";
import {Link} from 'react-router-dom';

class cartitems extends Component {

  

     render() {

        return(

            <div className="card">
      
        
   
  <div className="card-body" style={{backgroundColor: "#2874A6", color:"white"}} >
    <h5 className="card-title">Total Amount : Rs.{this.props.Total}</h5>
    <p className="card-text">You have created this cart on {this.props.Date}. Please check the arraving status </p>
  </div>
  <ul className="list-group list-group-flush">
  
    
  </ul>
  <div className="card-body">
    <Link to = {`cart/${this.props.orderId}`} ><button className ='button btn-success'>View More</button></Link>
   
  </div>
    </div>

         
        )
         
     }

     

}

export default cartitems;