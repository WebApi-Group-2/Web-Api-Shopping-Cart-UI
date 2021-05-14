import React, { Component } from "react";
import "../../../index.css";

class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto py-3 " style={{backgroundColor:"#000000" , textAlign:"-webkit-center"}}>
            <div className="container-sm-f">
                <span className="text" style={{color:"#7d7d7d"}}>&copy; Copyright 2021 - EBEE&trade; - All rights reserved.</span>
            </div>
            </footer>
                
        )
    }
}

export default Footer;