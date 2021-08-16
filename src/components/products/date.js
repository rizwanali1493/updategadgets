import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "./stylebox.css";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../common/breadcrumb";
import { toast } from "react-toastify";
// import "antd/dist/antd.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  filterSort,
  getVisibleproducts,
  postCompanyNames_Modal,
} from "../../actions/index";
import { issues } from "../../data2";
// import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

class Date extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      formate: "DD/MM/YYYY  - HH:mm",
      startDate: "",
      deviceType: "",
      companyName: "",
      modalName: "",
      issues: [],
      totalPrice: 0,
    };
  }

  async componentDidMount() {
    let deviceType = JSON.parse(localStorage.getItem("DeviceType") || "");
    let companyName = JSON.parse(localStorage.getItem("CompanyName") || "");
    let modalName = JSON.parse(localStorage.getItem("ModalName") || "");
    let startDate = JSON.parse(localStorage.getItem("Date") || "");
    let myDate = moment(startDate).toDate();
    // let startDate = JSON.parse(localStorage.getItem("Date") || "");
    // let startDate = localStorage.getItem("Date") || "";
    let data = JSON.parse(localStorage.getItem("SelectedIssues") || {});
    let totalPrice = 0;
    let issues = data.issues || [];
    issues.map((m, i) => {
      if (m.checked === true) {
        totalPrice = totalPrice + parseInt(m.charges);
      }
    });

    await this.setState({
      deviceType,
      companyName,
      modalName,
      issues,
      totalPrice,
      startDate: myDate,
    });
  }
  handleChange(date) {
    localStorage.setItem("Date", JSON.stringify(date));
    this.setState({
      startDate: date,
    });
  }

  handleSelection = () => {
    toast.error("please Select date for reparing");
  };
  // handleChange(date) {
  //   console.log("date>>>>>", date);
  //   localStorage.setItem("Date", JSON.stringify(date));
  //   this.setState({
  //     startDate: date,
  //   });
  // }

  // onChange = (value, dateString) => {
  //   console.log("Selected Time: ", value);
  //   console.log("Formatted Selected Time: ", dateString);
  //   localStorage.setItem("Date", JSON.stringify(dateString));
  //   this.setState({
  //     startDate: dateString,
  //   });
  // };

  // onOk = (value) => {
  //   console.log("onOk: ", value);
  // };

  render() {
    return (
      <div>
        {console.log("$$$$ State", this.state)}
        {/*SEO Support*/}
        <Helmet>
          <title>Shoop | Repair Slect Date</title>
          <meta name="description" content="..." />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"Collection"} />

        <section className="section-b-space">
          <div className="collection-wrapper">
            <div className="container">
              <div className="row">
                <div className="collection-content col">
                  <div className="page-main-content ">
                    <div className="">
                      <div class="row justify-content-center">
                        <div class="col-md-6">
                          <h3 class="selectdelivery-heading aleft">
                            Appointment Schedule
                          </h3>
                          <p class="selectdelivery-details">
                            Take your device to the store and pick it up once
                            the job done.{" "}
                          </p>
                          <h5>Slect Date and Time</h5>
                          <form
                          //   onSubmit={this.onFormSubmit}
                          >
                            {/* <div className="form-group">
                              <DatePicker
                                showTime
                                use12Hours={false}
                                // allowClear={false}
                                format="YYYY-MM-DD /   H:m"
                                value={moment(this.state.startDate)}
                                onChange={this.onChange}
                                // onOk={this.onOk}
                              />
                            </div> */}
                            <div className="form-group">
                              <DatePicker
                                className="date"
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={20}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm a"
                                placeholderText="Select Date and Time"
                              />
                            </div>
                          </form>
                          <p>
                            The Poetry Translation Centre is very proud to
                            partner with the Aké Arts and Books Festival to
                            present a special series of translation workshops on
                            the Nigerian languages of Yoruba, Igbo and Hausa.
                            Join like-minded poetry lovers from across the world
                            to discover new poetry and different cultures, share
                            insights and language skills, working together to
                            open up a poem in its original language and
                            reassemble it in English. The result will be new
                            group translations of contemporary Nigerian poems by
                            Oladapo Olatubosun, Auwalu Anwar and Amarachi
                            Attamah. To help in this task you will be guided by
                            a translator who is an expert in the language that
                            is the focus for that session, and a professional
                            poet. They will offer insight into the nuances of
                            the language and culture, and give helpful
                            suggestions for the direction of the translation
                            that is produced. Taking place online via Google
                            Meet, the workshops are the perfect way to keep
                            yourself feeling creative, engaged and connected to
                            the world at large. A rough and ready guide
                            translation is provided by the guest translator so
                            there is no need to know the language being
                            translated – simply sign up and bring your love of
                            poetry and language. Three 90 minutes sessions
                            focussing on a poem in each language will take place
                            on Thursday 22 October 2020: Yoruba language
                            workshop on the poetry of Oladapo Olatubosun:
                            10:00-11:30 Hausa language workshop on the poetry of
                            Auwalu Anwar: 12:30-14:00 Igbo language workshop on
                            the poetry of Amarachi Attamah: 15:00-16:30
                          </p>
                        </div>
                        <div class="col-md-6">
                          <div className="colmviewdata">
                            <div className="mainpading">
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
                                  <b>Repair Services :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">Clik</span>
                                </h6>
                              </div>
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Store :</b>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="prob">Shoop | Repair</span>
                                </h6>
                              </div> */}
                              <div className="headind1">
                                <h6 className="h61">
                                  <b>Total Price :</b>
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="btuun">
                  {this.state.startDate ? (
                    <Link to={`${process.env.PUBLIC_URL}/info`}>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        id="btton"
                      >
                        Next
                      </button>
                    </Link>
                  ) : (
                    <div onClick={this.handleSelection}>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        id="btton"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  {}
)(Date);
