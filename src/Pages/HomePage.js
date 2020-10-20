import React, { Component } from 'react';
import ProductListing from '../components/ProductListing';
import './HomePage.css'

class HomePage extends Component{
   
    render(){
        return(
            <>
            <div className="root">
                <div className="productListing">
                    <ProductListing/>
                </div>
            </div>
            </>
        );
    }
}

export default HomePage;