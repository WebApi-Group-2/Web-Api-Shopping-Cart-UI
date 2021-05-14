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
            isviewmore:false,
            TotalAmount:Number = 0,
            shippingAddress:String = '',
            viewmoreName :String ='',
            viewmorePrice:Number = 0,
            viewmoreDiscription:String='',
            viewmoreImageURL:String = '',
            viewmoreDiscount:Number=0,
            viewmoreStock:String = '',
            searchItemget:String=''
        }
        this.handleupdate = this.handleupdate.bind(this);
        this.iscartset = this.iscartset.bind(this);
        this.insertOrder = this.insertOrder.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.viewmore = this.viewmore.bind(this);
        this.isviewmoreset = this.isviewmoreset.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
       
    }

    handleChange(event) {
        this.setState({shippingAddress: event.target.value});
    }

    handleChangeSearch(event) {
        this.setState({searchItemget: event.target.value});
        
    }

    viewmore = async(id)=> {
        
        const {data} = await axios.get("http://localhost:5000/item/getviewmoreitems",{params: {id:id}});

        console.log(data);

        // viewmoreName :String ='',
        //     viewmorePrice:Number = 0,
        //     viewmoreDiscription:String='',
        //     viewmoreImageURL:String = '',
        //     viewmoreDiscount:Number=0

        this.setState({viewmoreName:data[0].name});
        this.setState({viewmorePrice:data[0].uPrice});
        this.setState({viewmoreDiscription:data[0].description});
        this.setState({viewmoreImageURL:data[0].imageURL});
        this.setState({viewmoreDiscount:data[0].discount});
        this.setState({isviewmore:true});


        if(data[0].status == true)
        {
            this.setState({viewmoreStock:"Available"});
        }
        else
        {
            this.setState({viewmoreStock:"Out of Stock"});
        }

        if (data[0].discount > 0)
        {
            const price = data[0].uPrice - (data[0].uPrice * data[0].discount/100);

            this.setState({viewmorePrice:"Discount Price: Rs."+price});
        }
        else
        {
            this.setState({viewmorePrice:"Price: Rs." +data[0].uPrice});
        }

      
    //    const maped = data.map(items => {
    //         return{
    //            id : items._id,
    //            name : items.name,
    //            uPrice: items.uPrice,
    //            imageURL: items.imageURL,
    //            description: items.description,
    //            discount: items.discount
    
    
    //         }
    //     });
        
        
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


    itemSearch = async () =>{

        if(this.state.searchItemget != '')
        {

            const {data} = await axios.get("http://localhost:5000/item/searchitems",{params: {text:this.state.searchItemget}});

      
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
        else{
            this.getallitem();
        }

    }
    


     render() {

        

        return(

         
         <div className='container-fluid' style={{marginTop: "20px",backgroundColor: "#ffffff"}} >

                <ul className="nav justify-content-end" style={{backgroundColor: "#ffffff"}}>
                    <li className="nav-item">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={this.handleChangeSearch}/>
                    </li>
                    <li className="nav-item" style={{marginLeft:"1.25rem"}}>
                        <button className="btn btn-outline-dark my-2 my-sm-0" onClick={this.itemSearch}>Search</button>
                    </li>
                </ul>
             



              <Modal show={this.state.isviewmore} onHide={this.isviewmoreset}>
               <Modal.Header>
               <img className="card-img-top" src={this.state.viewmoreImageURL} alt="Card image cap" style={{marginLeft:"auto",marginRight:"auto", width:"auto",height:"200px"}}/>   
                
                 </Modal.Header>
                 <Modal.Body>
                 <div className="card" >
                    <div className="card-header" style={{backgroundColor: "#1a1a1a",color:"white"}} >
                      <h5>{this.state.viewmoreName}</h5>
                    </div>
                       <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Description:</b> {this.state.viewmoreDiscription}</li>
                        <li className="list-group-item"><b>Stock:</b> {this.state.viewmoreStock} </li>
                        
                       </ul>
                     </div>
                 </Modal.Body>
                  <Modal.Footer style={{marginLeft:"auto", marginRight:"auto", color:"red"}}>
                  <h5 >{this.state.viewmorePrice}</h5>
                 </Modal.Footer>
             </Modal>
          

            <Modal show={this.state.iscart} onHide={this.iscartset}>
             <Modal.Header style={{justifyContent:"center", fontWeight:"bold"}}>
                 CART
             </Modal.Header>
            <Modal.Body>

            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Add Your Shipping Address" onChange={this.handleChange}/><br></br>
 
               
            <table class="table" style={{backgroundColor: "#f5f5f5",color:"black"}} >
  <thead class="thead" style={{backgroundColor: "#1a1a1a",color:"white"}} >
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
 
 <button className='btn btn-success' style={{float:"right"}} onClick={this.insertOrder}>Order</button>


            </Modal.Body>
            <Modal.Footer style={{fontWeight:"bold", fontSize:"1.1rem", color:"red", marginRight:"0.3rem"}}>
             Total Amount: Rs.{this.state.TotalAmount}
           </Modal.Footer>
           </Modal>
            <div className='row' style={{padding: "10px"}}>

                

                    {this.state.items.map((items) =>(
                    <div className = 'col-sm-3' style={{marginTop: "0.938rem", marginBottom: "1.25rem"}} key={items._id}> 
                   <CustomerItemList key= {items.id} name={items.name} price = {items.uPrice} imageURL = {items.imageURL} description={items.description} discount={items.discount} id={items.id} handleupdate={this.handleupdate.bind(this)} viewmore={this.viewmore.bind(this)}/>
                   </div>
                   ))}      

                
            </div>
              
         </div>
        )
         
     }

     //insert order


       insertOrder = async()=> {
       
        if(this.state.shippingAddress == "")
        {
            alert("please add your shipping Address");
        }
        else
        {
            const tokenString = sessionStorage.getItem('token');
            const userToken = JSON.parse(tokenString);
            
            const request = {TotalAmount:this.state.TotalAmount, AddressShiping: this.state.shippingAddress,itemdetails:this.state.cartItems,Token:userToken};
            const respon = await axios.post('http://localhost:5000/api/order/add/',request);

            if (respon.status == 200)
            {
                alert("order successfully added");
                this.setState({cartItems:[]});
                this.setState({iscart:false});
                this.setState({TotalAmount:''});
                this.setState({shippingAddress:''});
            }

            // console.log(request);
            

        }
       
        
     }
     

     iscartset() {
        this.setState({iscart:false});
     }

     isviewmoreset() {
        this.setState({isviewmore:false});
     }


     getallitem = async() => {

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


     async componentDidMount() {
    
        
       this.getallitem();
        

     
    
    
        
    
      }

    

}

export default customerHome;