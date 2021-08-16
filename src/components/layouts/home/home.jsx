import React, { Component } from 'react';
import {Helmet} from 'react-helmet'
import '../../common/index.scss';
import Slider from 'react-slick';
import {Link} from 'react-router-dom';

// Import custom components
import TopCollection from './top-collection';
import SpecialProducts from "../common/products";
// import BlogSection from "../common/blogsection";
// import Instagram from "../common/instagram";
// import LogoBlock from "../common/logo-block";
import {
    svgFreeShipping,
    svgservice,
    svgoffer
} from "../../../services/script"


class Home extends Component {

    componentDidMount() {
        document.getElementById("color").setAttribute("href", `#` );
    }

	render() {
		return (
			<div>
                <Helmet>
                <title>Shoop | Repair</title>
                    <meta name="description" content=".." />
                </Helmet>
                {/*Home Slider*/}
                <section className="p-0">
                    <Slider  className="slide-1 home-slider">
                        <div>
                            <div className="home home1 text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                <h4>welcome to Shop | Repair</h4>
                                                    <h1>All Repair</h1>
                                                    <Link to={`${process.env.PUBLIC_URL}/book-repair`} className="btn btn-solid">Repair now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home2 text-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                <h4>welcome to Shop | Repair</h4>
                                                    <h1>Shop Store</h1>
                                                    <Link to={`${process.env.PUBLIC_URL}/shop--now`} className="btn btn-solid">shop now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>
                {/*Home Section End*/}

                {/*collection banner*/}
                <section className="pb-0">
                    <div className="container-fluid">
                        <div className="row partition2">
                            <div className="col-md-12" id="reviewid">
                                
                                
                                    <div className="collection-banner p-right text-center">
                                               
                                    <a id="profile-link" target="_blank" href="https://uk.trustpilot.com/review/www.google.com?utm_medium=trustbox&amp;utm_source=MicroCombo">
                                                   <div className="reviev">
                                                   
                                                        <div  className="exelent"><h4>Excellent</h4></div>
                                                        <div className="rating">
                                                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                                                        </div>
                                                        <div  className="exelent"><h4>-------- Reviews on  </h4></div>
                                                        <div  className="exelent"><h4><span>☆</span>Trustpiolt </h4></div>
                                                  </div></a>
                                               
                                            
                                    </div>
                               
                            </div>
                            {/* <div className="col-md-6">
                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                    <div className="collection-banner p-right text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner2.jpg`} className="img-fluid" alt=""/>
                                            <div className="contain-banner">
                                                <div>
                                                    <h4>save 60%</h4>
                                                    <h2>Shop</h2>
                                                </div>
                                            </div>
                                    </div>
                                </Link>
                            </div> */}
                        </div>
                        <div className="row justify-content-center partition2">
                        
                                    <div className="col-md-3">
                                        {/* <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}> */}
                                        
                                                    
                                                    <Link to={`${process.env.PUBLIC_URL}/book-repair`}>
                                                        <div className="ffcchaild1">
                                                            <img id="img" src={`${process.env.PUBLIC_URL}/assets/images/newimg/fixmydevice.png`} alt="" />
                                                            <p>Fix My Device</p>
                                                        </div>
                                                        </Link>  
                                                        
                                                    
                                        
                                        {/* </Link> */}
                                    </div>
                                    <div className="col-md-3">
                                        {/* <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}> */}
                                        
                                                    
                                                        
                                                        <Link to={`${process.env.PUBLIC_URL}/pages/contact`} > 
                                                        <div className="ffcchaild">
                                                            <img id="img2" src={`${process.env.PUBLIC_URL}/assets/images/newimg/findastore.png`} alt="" />
                                                            <p>Find My Store</p>
                                                        </div>
                                                        </Link>
                                                        
                                                    
                                                    
                                        
                                        {/* </Link> */}
                                    </div>
                                    <div className="col-md-3">
                                        {/* <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}> */}
                                        
                                                    
                                                        <Link to={`${process.env.PUBLIC_URL}/pages/Covid`} >    
                                                        <div className="ffcchaild">
                                                            <img id="img3" src={`${process.env.PUBLIC_URL}/assets/images/newimg/info-icon.png`} alt="" />
                                                            <p>Info Covid 9</p>
                                                        </div>
                                                        </Link>
                                                    
                                        
                                        {/* </Link> */}
                                    </div>
                                
                                    {/* <div className="col-md-6">
                                        <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                            <div className="collection-banner p-right text-center">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner2.jpg`} className="img-fluid" alt=""/>
                                                    <div className="contain-banner">
                                                        <div>
                                                            <h4>save 60%</h4>
                                                            <h2>Shop</h2>
                                                        </div>
                                                    </div>
                                            </div>
                                        </Link>
                                    </div> */}
                          </div>
                    </div>
                </section>
                {/*collection banner end*/}

                <TopCollection type={'women'} />

               {/*Parallax banner*/}
               <section className="p-0">
                    <div className="full-banner parallax-banner1 parallax text-center p-left">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h2>2021</h2>
                                        <h3>Shop | Repair</h3>
                                        <h4>special offer</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Parallax banner End*/}

                <SpecialProducts />

                {/*service layout*/}
                <div className="container">
                    <section className="service border-section small-section ">
                        <div className="row">
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                    <div className="media-body">
                                        <h4>free shipping</h4>
                                        <p>free shipping world wide</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                    <div className="media-body">
                                        <h4>24 X 7 service</h4>
                                        <p>online service for new customer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                    <div className="media-body">
                                        <h4>festival offer</h4>
                                        <p>new online special festival offer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/*Blog Section end*/}
                {/* <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title1 section-t-space">
                                <h4>Recent Story</h4>
                                <h2 className="title-inner1">from the blog</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="blog p-t-0">
                    <BlogSection />
                </section> */}
                {/*Blog Section End*/}

                {/* <Instagram /> */}

                {/*logo section*/}
                {/* <LogoBlock /> */}
                {/*logo section end*/}
			</div>
			)


	}
}

export default Home;