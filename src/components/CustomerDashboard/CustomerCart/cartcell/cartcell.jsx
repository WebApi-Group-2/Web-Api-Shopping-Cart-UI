import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";
import {Link} from 'react-router-dom';

class cartcell extends Component {

  

     render() {

        return(
         <React.Fragment>
            <tr key={this.props.id}>
             
             <td>{this.props.name}</td>
             <td>{this.props.qty}</td>
             <td>Rs.{this.props.price}</td>
             <td>Rs.{this.props.price}</td>
       
           </tr>

           </React.Fragment>

         
        )
      
         
     }

     

}

export default cartcell;