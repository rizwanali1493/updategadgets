import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "./stylebox.css";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../common/breadcrumb";
// import WOW from 'wowjs';
import moment from "moment";

import {
  filterSort,
  getVisibleproducts,
  postCompanyNames_Modal,
} from "../../actions/index";
import { issues } from "../../data2";

class Bystore extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     startDate: new Date()
    //   };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",

      startDate: "",
      deviceType: "",
      companyName: "",
      modalName: "",
      issues: [],
      totalPrice: 0,
    };
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate);
  }
  async componentDidMount() {
    let deviceType = JSON.parse(localStorage.getItem("DeviceType") || "");
    let companyName = JSON.parse(localStorage.getItem("CompanyName") || "");
    let modalName = JSON.parse(localStorage.getItem("ModalName") || "");
    // let startDate = JSON.parse(localStorage.getItem("Date") || "");
    let startDate = JSON.parse(localStorage.getItem("Date") || "");
    let myDate = moment(startDate).toDate();
    let finalDate = moment(myDate).format("MMMM Do YYYY, h:mm a");

    let dataa = await JSON.parse(localStorage.getItem("SelectedIssues") || {});
    let data = await JSON.parse(localStorage.getItem("FormData") || {});
    let totalPrice = 0;
    let issues = dataa.issues || [];
    issues.map((m, i) => {
      if (m.checked === true) {
        totalPrice = totalPrice + parseInt(m.charges);
      }
    });

    await this.setState({
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      phone: data.phone || "",
      email: data.email || "",
      address: data.address || "",
      city: data.city || "",
      pincode: data.pincode || "",

      deviceType,
      companyName,
      modalName,
      issues,
      totalPrice,
      startDate: finalDate,
    });
  }

  render() {
    let { colSize, hasMoreItems } = this.state;
    const { filters } = this.props;

    return (
      <div>
        {console.log("$$$$ State", this.state)}
        {/*SEO Support*/}
        <Helmet>
          <title>Shoop | Repair</title>
          <meta name="description" content="..." />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"By Store"} />

        <section className="section-b-space">
          <div className="collection-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="collection-content col">
                  <div className="page-main-content ">
                    <div className="">
                      <div class="row justify-content-center" id="rowfrist">
                        <div class="col-md-6 text-center">
                          <img
                            className="img11"
                            src={`${
                              process.env.PUBLIC_URL
                            }/assets/images/menu-icon/thank1.png`}
                            alt=""
                          />
                          <h1 className="h11">Thank You !</h1>
                          <h5 className="h55">
                            Your Booking Has Been Confirmed.
                          </h5>
                        </div>
                        <div class="col-md-5">
                          <div className="colmviewdata">
                            <div className="mainpading" id="hovercustmer">
                              <div className="headind">
                                <h2>Your joob</h2>
                              </div>
                              <br />
                              <br />
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Device Type :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">
                                    {this.state.deviceType}
                                  </span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Brand :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">
                                    {this.state.companyName}
                                  </span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Modal :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">
                                    {this.state.modalName}
                                  </span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Problem(s) :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <br />
                                  {this.state.issues.map((m, i) => {
                                    return m.checked === true ? (
                                      <span className="prob">{m.issue}, </span>
                                    ) : (
                                      ""
                                    );
                                  })}
                                </h6>
                              </div>
                              {/* <div className="headind1">
                                <h6 className="h61">
                                  <b>Repair Services :</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">Clik</span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Store :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">Shoop | Repair</span>
                                </h6>
                              </div> */}
                              <div className="headind1">
                                <h6 className="h61">
                                  <b> Appointment Date :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">
                                    {this.state.startDate}
                                  </span>
                                </h6>
                              </div>
                              {/* <div className="headind1">
                                <h6 className="h61">
                                  <b>Appointment Time :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">09 : 30</span>
                                </h6>
                              </div> */}
                              <div className="headind1">
                                <h6 className="h61">
                                  <b> Total Price :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">
                                    $ {this.state.totalPrice}
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row justify-content-center">
                        <div class="col-md-4" id="centrtext">
                          <div className="colmviewdata" id="hov">
                            <div className="headind">
                              <h4 id="centr">Store Timing</h4>
                            </div>
                            <div className="mainpading11">
                              {/* <div className="timedetails">
                                <div className="headind111">
                                  <h6 className="h61">
                                    Shoop | Repair BrentFord
                                  </h6>
                                </div>
                              </div> */}
                              <div>
                                <div className="headind111">
                                  <h6 className="h61">
                                    <b>Monday</b> :
                                    <label className="time1">
                                      09:30 - 18:00
                                    </label>
                                  </h6>
                                </div>
                                <div className="headind111">
                                  <h6 className="h61">
                                    <b>Tuesday</b> :
                                    <label className="time1">
                                      09:30 - 18:00
                                    </label>
                                  </h6>
                                </div>
                                <div className="headind111">
                                  <h6 className="h61">
                                    <b>Wednesday</b> :
                                    <label className="time1">
                                      09:30 - 18:00
                                    </label>
                                  </h6>
                                </div>
                                <div className="headind111">
                                  <h6 className="h61">
                                    <b>Thursday</b> :
                                    <label className="time1">
                                      09:30 - 18:00
                                    </label>
                                  </h6>
                                </div>
                                <div className="headind111">
                                  <h6 className="h61">
                                    <b>Friday</b> :
                                    <label className="time1">
                                      09:30 - 18:00
                                    </label>
                                  </h6>
                                </div>
                                <div className="headind111">
                                  <h6 className="h61">
                                    <b>Saturday</b> :
                                    <label className="time1">
                                      09:30 - 18:00
                                    </label>
                                  </h6>
                                </div>
                                <div className="headind111">
                                  <h6 className="h61">
                                    <b>Sunday</b> :
                                    <label className="time1">
                                      09:30 - 18:00
                                    </label>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div className="colmviewdata">
                            <div className="mainpading" id="hov">
                              <div className="headind">
                                <h4>Custmor Information</h4>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Name :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">{`${
                                    this.state.first_name
                                  } ${this.state.last_name}`}</span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Email :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">
                                    {this.state.email}
                                  </span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Number :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">
                                    {this.state.phone}
                                  </span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Address :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">
                                    {this.state.address}
                                  </span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Passcode :</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">
                                    {this.state.pincode}
                                  </span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Seirel Number :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">A..b..c</span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Reffrence :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">A..b..c</span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.data,
  filters: state.filters,
  symbol: state.data.symbol,
});

export default connect(
  mapStateToProps,
  { filterSort, getVisibleproducts, postCompanyNames_Modal }
)(Bystore);
