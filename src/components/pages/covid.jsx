import React, {Component} from 'react';
import Breadcrumb from "../common/breadcrumb";
import './covid.css';
import {Link} from 'react-router-dom';

class covid extends Component {

    constructor (props) {
        super (props)
    }

    render (){


        return (
            <div>
                <Breadcrumb title={'Covid'}/>
                
                {/*Paragraph*/}
                <div className="title1  section-t-space">
                    
                    <h2 className="title-inner1">Covid-19</h2>
                </div>
                {/*Paragraph End*/}
                {/*Forget Password section*/}
                <section className=" contact-page section-b-space">
                    <div className="container">
                        <div className="row">
                               <div className="para">
                                    <p>Masks should be used as part of a comprehensive strategy of measures to suppress transmission and save lives; the use of a mask alone is not sufficient to provide an adequate level of protection against <b>COVID-19</b>.<br/>

If COVID-19 is spreading in your community, stay safe by taking some simple precautions, such as physical distancing, wearing a mask, keeping rooms well ventilated, avoiding crowds, cleaning your hands, and coughing into a bent elbow or tissue. Check local advice where you live and work.<b> Do it all!</b></p>
                                   
                                </div>
                                <div><img src="https://i.shgcdn.com/b0d84319-c81b-4a98-ad24-7285e082558d/-/format/auto/-/preview/3000x3000/-/quality/lighter/" class="img-fluid" alt="..."/></div>
                              <div className="butfix">
                                              <Link to={`${process.env.PUBLIC_URL}/book-repair`}>
                                                   <div className="ffcchaild1">
                                                       <img id="img" src={`${process.env.PUBLIC_URL}/assets/images/newimg/fixmydevice.png`} alt="" />
                                                       <p>Fix My Device</p>
                                                   </div>
                                                </Link>
                              </div>

                        </div>
                       
                    </div>
                </section>

            </div>
        )
    }
}

export default covid