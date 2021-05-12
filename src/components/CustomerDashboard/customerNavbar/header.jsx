import React, { Component } from "react";
import {Carousel} from "bootstrap/js/dist/carousel";

import img1 from './cimg11.jpg';
import img2 from './cimg22.jpg';
import img3 from './cimg33.jpg';


class HeaderMiddle extends Component {
    render() {
        return (
            
                
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                     <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img className="d-block w-100" src={img1} alt="First slide"></img>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>VISIT US</h5>
                                <p> FOR LATEST TECHNOLOY EQUIPMENTS  </p>
                            </div>
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100" src={img2} alt="Second slide"></img>
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100" src={img3} alt="Third slide"></img>
                        <div className="carousel-caption d-none d-md-block">
                                <h5>VISIT US</h5>
                                <p> FOR LATEST TECHNOLOY EQUIPMENTS  </p>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                
            
        )
    }
}

export default HeaderMiddle;