import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React,{Component} from "react";


class customerItemlist extends Component {

  

  render() {
    var handeleToUpdate = this.props.handleupdate;
    var viewmore1 = this.props.viewmore; 

    return(
           
      <div className="card shadow-sm" style={{width: "18rem" }} key={this.props.id}>
        <img className="card-img-top" src={this.props.imageURL} alt="Card image cap"/>
          <div className="card-body" style={{padding: ".20rem 1.25rem"}}>
            <h5 className="card-title" style={{marginBottom: "5px"}}>{this.props.name}</h5>
            <p className="card-text">{this.props.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item" style={{padding: ".20rem 1.25rem"}}><b>Price:</b> Rs.{this.props.price}</li>
            <li className="list-group-item" style={{padding: ".20rem 1.25rem"}}><span style={{color:'red' }}><b>Discount:</b> {this.props.discount}% </span></li>

          </ul>
          <div className="card-body">
            <button className='btn btn-success' style={{fontSize: "0.875rem"}} onClick={()=>viewmore1(this.props.id)}><i className="fas fa-info-circle" style={{marginRight: "5px"}} ></i>View More</button> {' '}
            <button className='btn btn-dark' style={{fontSize: "0.875rem"}} onClick={()=>handeleToUpdate(this.props.id)}><i className="fas fa-shopping-cart" style={{marginRight: "5px"}}></i>Add to Cart</button>
        
          </div>
    </div>
      
        )
         
     }

    

}

export default customerItemlist;