import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";
import {Link} from 'react-router-dom';

class itemdetailtablecell extends Component {

  

     render() {

        return(
         <React.Fragment>
            <tr key={this.props.id}>
             <th ><img src= {this.props.Photo} className="rounded float-left" alt="robo" style={{width:100 ,height: 100}} /></th>
             <td>{this.props.Name}</td>
             <td>{this.props.Qty}</td>
             <td>Rs.{this.props.UnitPrice}</td>
             <td>Rs.{this.props.Total}</td>

             <td><Link to = {this.props.btndis ?'#' :`qtyedit/${this.props.id}`}><button className='btn btn-dark' style={{color:"#ffffff"}}>Edit QTY</button></Link></td>

           </tr>

           </React.Fragment>

         
        )
      
         
     }

     

}

export default itemdetailtablecell;