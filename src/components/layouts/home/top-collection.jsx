import React, { Component } from 'react';
import Slider from 'react-slick';
import {connect} from 'react-redux'
import './newstlyewhy.css';
import {getTrendingCollection} from '../../../services/index'
import {Product4, Product5} from '../../../services/script'
import {addToCart, addToWishlist, addToCompare} from "../../../actions/index";
import ProductItem from '../common/product-item';

class TopCollection extends Component {

    render (){

        const {items, symbol, addToCart, addToWishlist, addToCompare, type} = this.props;

        var properties;
        if(type === 'kids'){
            properties = Product5
        }else{
            properties = Product4
        }

        return (
            <div className="coronagiedline">
                {/*Paragraph*/}
                <div className="title1  section-t-space">
                    
                    <h2 className="title-inner1">why Repair?</h2>
                </div>
                {/*Paragraph End*/}
                <section className="section-b-space p-t-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="peragraph">
                                <p>iSmash specialises in offering an express repair service for smartphones, tablets and computers along with a wide range of mobile accessories and refurbished devices. Since launching in 2013, iSmash has grown to 32 repair shops across the UK and counting! We pride ourselves on offering an express repair service powered by our iSmash accredited technicians, on-site at each of our shops, and all our screen repairs are backed by a lifetime warranty*</p>
                                   
                                </div>
                            </div> 
                        </div>   
                            <div className="row justify-content-center" id="rewheight">
                                <div className="col-lg-2">
                                    <div className="icon1">
                                        <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                        <p>Express Repairs</p>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="icon1">
                                        <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                        <p>Express Repairs</p>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="icon1">
                                        <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                        <p>Express Repairs</p>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="icon1">
                                        <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                        <p>Express Repairs</p>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="icon1">
                                        <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                        <p>Express Repairs</p>
                                    </div>
                                </div>
                            </div>
                                {/* <div className="five-icon">
                                    <div className="icon1">
                                    <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                    <p>Express Repairs</p>
                                    </div>
                                    <div className="icon1">
                                    <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                    <p>Express Repairs</p>
                                    </div>
                                    <div className="icon1">
                                    <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                    <p>Express Repairs</p>
                                    </div>
                                    <div className="icon1">
                                    <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                    <p>Express Repairs</p>
                                    </div>
                                    <div className="icon1">
                                    <img id="imgicon1" src={`${process.env.PUBLIC_URL}/assets/images/newimg/newho.png`} alt="" />
                                    <p>Express Repairs</p>
                                    </div>
                                </div> */}
                               
                                
                           
                        
                    </div>
                </section>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    items: getTrendingCollection(state.data.products, ownProps.type),
    symbol: state.data.symbol
})

export default connect(mapStateToProps, {
    addToCart,
    addToWishlist,
    addToCompare
    })
    (TopCollection);