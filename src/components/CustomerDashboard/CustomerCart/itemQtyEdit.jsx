import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

class itemQtyEdit extends Component {

    constructor(props) {
        super(props);
       this.state = {
    
          itemqty:Number = 0,
          unitprice:Number,
          itemname:String = "Product",
          imageURL:String = "/images"
      } 
    
        this.handleChange = this.handleChange.bind(this);
         this.qtyuodate = this.qtyuodate.bind(this);
    }


    handleChange(event) {
        this.setState({itemqty: event.target.value});
      }

  

     render() {

        return(
           <div className='container' style={{ backgroundColor: "white", marginTop: "30px" }}>
            <div className="card">
            <div className="card-header">
              Qty Edit in Product:- <b>{this.state.itemname}</b>
            </div>
            <div className="card-body">
                <div className='row'>
                    <div className='col-sm-3'>
                    <th ><img src= {this.state.imageURL} className="rounded float-left" alt="robo" style={{width:200 ,height: 200}} /></th>
                    </div>

                    <div className='col-sm-9'>

                    <h5 className="card-title">Edit Item Qty</h5>
                    <input type="text" placeholder="Qty" value= {this.state.itemqty} onChange={this.handleChange}/> <br></br><br></br>
                    <button className="btn btn-primary" onClick = {this.qtyuodate}>Update</button>
                        
                    </div>
                </div>
              
            </div>
          </div>
          </div>
        )
         
     }

     qtyuodate = async() => {

        if (this.state.itemqty == "")
        {
          alert('Qty field must be filled')
        }
        else
        {
          const re = /^[0-9\b]+$/;
          if(re.test(this.state.itemqty))
          {

            const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
    
        const item = {Token:userToken, qty: this.state.itemqty,unitprice:this.state.unitprice};
    
        await axios.put(`http://localhost:5000/api/order/updateitemqty/${this.props.match.params.id}`, item).then(response => {
          if (response.status == 200)
          {
            alert("successfully updated");
          }
          else {
            alert("somthing went wrong");
          }
      });
    
        }

        else{

          alert("Please add Numaric values as Qty");
        }

          }
          
        
      }


     async componentDidMount() {

        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
       
        let totalfinal = 0;
        
    
        const {data} = await axios.get("http://localhost:5000/api/order/getitemqty/",{params: {token:userToken,itemid:this.props.match.params.id}});

      
       const maped = data[0].itemdetails.map(item => {
    
          if (item._id == this.props.match.params.id) 
          {
            this.setState({itemqty:item.qty});
            this.setState({itemname:item.name});
            this.setState({unitprice:item.unitPrice});
            this.setState({imageURL:item.ImageURL});
          }
          
        });
    
         
      }

     

}

export default itemQtyEdit;