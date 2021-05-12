import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React,{Component} from "react";
import logo from './logo3.png';
import {Link} from 'react-router-dom';

class navbar extends Component {

  state = {

    activeclass: ""
    
  }

     render() {

        return(
         <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor: "#000000"}}>
         <a className="navbar-brand" ><img src={logo} style={{width: "auto" , height: "auto" }}/></a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
           <ul className="navbar-nav">
             <li className="nav-item active">
              <a className="nav-link" href="/"><i className="fas fa-home"></i> <span className="sr-only"></span></a>
             </li>
             <li className='nav-item '>
              <a className="nav-link" href="/cart"><i className="fas fa-shopping-cart"> </i><span className="sr-only"></span></a>
             </li>
             <li className='nav-item '>
              <a className="nav-link" href="/"><i class="fas fa-sign-out-alt"></i><span className="sr-only"></span></a>
             </li>
             
           </ul>
         </div>
       </nav>
        )
         
     }

    

}

export default navbar;