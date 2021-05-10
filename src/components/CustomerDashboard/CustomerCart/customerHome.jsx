import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import CustomerItemList from './customerItemList/customerItemlist';
import CartList from './cartcell/cartcell';
import Modal from "react-bootstrap/Modal";



class customerHome extends Component {
   
    constructor(props){
        super(props)
        this.state = {
            items:[],
           
            cartItems:[],
            iscart:false,
            TotalAmount:Number = 0,
            shippingAddress:String = ''
        }
        this.handleupdate = this.handleupdate.bind(this);
        this.iscartset = this.iscartset.bind(this);
        this.insertOrder = this.insertOrder.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({shippingAddress: event.target.value});
    }

    handleupdate(id){

       
        // var rr = this.state.cartItems.slice();
        // rr.push(id);

        this.state.items.map(items => {

            if(items.id == id)
            {
                const item = {

                   itemId : items.id,
                   name : items.name,
                   qty:1,
                   unitPrice: items.uPrice,
                   ImageURL: items.imageURL,
                   
                };

                this.setState({TotalAmount:this.state.TotalAmount+items.uPrice});

                this.setState({cartItems:this.state.cartItems.concat(item)});
            }
            
        });

        
        this.setState({iscart:true});
        
        
    }
    


     render() {

        console.log(this.state.cartItems)

        return(

         
         <div className='container-fluid' style={{marginTop: "20px",backgroundColor: "#34495E" }} >
          

            <Modal show={this.state.iscart} onHide={this.iscartset}>
             <Modal.Header>
                 Cart
             </Modal.Header>
            <Modal.Body>

            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Add Your Shipping Address" onChange={this.handleChange}/><br></br>
 
               
            <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Qty</th>
      <th scope="col">Unit Price</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
  {this.state.cartItems.map((items) =>(
                    
     <CartList key= {items.itemId} name={items.name} qty={items.qty} price = {items.unitPrice}   id={items.itemId} />
                 
    ))}
    
  </tbody>
</table><br></br>
 
 <button className='btn btn-success' onClick={this.insertOrder}>Order</button>


            </Modal.Body>
            <Modal.Footer>
             TotalAmount: Rs.{this.state.TotalAmount}
           </Modal.Footer>
           </Modal>
            <div className='row' style={{padding: "10px"}}>
             
                {this.state.items.map((items) =>(
                    <div className = 'col-sm-3' key={items._id}> 
                   <CustomerItemList key= {items.id} name={items.name} price = {items.uPrice} imageURL = {items.imageURL} description={items.description} discount={items.discount} id={items.id} handleupdate={this.handleupdate.bind(this)} />
                   </div>
                ))}
               

                
            </div>
              
         </div>
        )
         
     }

     //insert order
     

     iscartset() {
        this.setState({iscart:false});
     }


     async componentDidMount() {
    
        
    
        const {data} = await axios.get("http://localhost:5000/item/getenableitems/",{params: {status:true}});

      
       const maped = data.map(items => {
            return{
               id : items._id,
               name : items.name,
               uPrice: items.uPrice,
               imageURL: items.imageURL,
               description: items.description,
               discount: items.discount
    
    
            }
        });
    
        this.setState({items:maped});

     
    
    
        
    
      }

    

}

export default customerHome;