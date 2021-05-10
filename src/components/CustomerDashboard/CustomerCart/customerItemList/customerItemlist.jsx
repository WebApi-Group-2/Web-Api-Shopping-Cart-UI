import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";


class customerItemlist extends Component {

  

     render() {
        var handeleToUpdate = this.props.handleupdate;

        return(
           
            <div className="card" style={{width: "18rem" }} key={this.props.id}>
  <img className="card-img-top" src={this.props.imageURL} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">{this.props.name}</h5>
    <p className="card-text">{this.props.description}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><b>Price:</b> Rs.{this.props.price}</li>
    <li className="list-group-item"><span style={{color:'red' }}><b>Discount:</b> {this.props.discount}% </span></li>

  </ul>
  <div className="card-body">
    <button className='btn btn-success'>View More</button> {' '}
    <button className='btn btn-primary' onClick={()=>handeleToUpdate(this.props.id)}>Add to Cart</button>
 
  </div>
            </div>
      
        )
         
     }

    

}

export default customerItemlist;