import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PaypalExpressBtn from "react-paypal-express-checkout";
import SimpleReactValidator from "simple-react-validator";
import "./stylebox.css";
import Breadcrumb from "../common/breadcrumb";
import { removeFromWishlist } from "../../actions";
import { getCartTotal } from "../../services";
import { toast } from "react-toastify";
import moment from "moment";
// import PatternLock from "react-pattern-lock";
// import PatternLock from "react-pattern-lock";
// import PatternLock from "react-pattern-lock";
// import PatternLock from "react-pattern-lock";
import Demo from "./pattern";
class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: false,
      success: false,
      disabled: false,
      size: 3,
      path: [],
      payment: "stripe",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      create_account: "",
      FormData: {},
      formDataTrueOrFalse: false,

      deviceType: "",
      companyName: "",
      modalName: "",
      issues: [],
      totalPrice: 0,
      startDate: "",
    };
    this.validator = new SimpleReactValidator();
  }
  errorTimeout = 0;
  async componentDidMount() {
    window.addEventListener("keydown", ({ which }) => {
      if (which === 38) {
        this.setState({
          size: this.state.size >= 10 ? 10 : this.state.size + 1,
        });
      } else if (which === 40) {
        this.setState({ size: this.state.size > 3 ? this.state.size - 1 : 3 });
      }
    });

    let data = JSON.parse(localStorage.getItem("FormData")) || {};
    if (
      data.first_name ||
      ("" !== "" && data.last_name) ||
      ("" !== "" && data.phone) ||
      ("" !== "" && data.email) ||
      ("" !== "" && data.address) ||
      ("" !== "" && data.city) ||
      ("" !== "" && data.pincode) ||
      "" !== ""
    ) {
      this.setState({
        formDataTrueOrFalse: true,
      });
    } else {
      this.setState({
        formDataTrueOrFalse: false,
      });
    }

    let deviceType = JSON.parse(localStorage.getItem("DeviceType") || "");
    let companyName = JSON.parse(localStorage.getItem("CompanyName") || "");
    let modalName = JSON.parse(localStorage.getItem("ModalName") || "");

    // let myDate = moment(startDate).toDate();
    // let startDate = JSON.parse(localStorage.getItem("Date") || "");
    let dataa = JSON.parse(localStorage.getItem("SelectedIssues") || {});
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
      startDate,
      deviceType,
      companyName,
      modalName,
      issues,
      totalPrice,
    });
    let startDate = JSON.parse(localStorage.getItem("Date") || "");
    console.log("startdddddddd", startDate);
    let myDate = moment(startDate).toDate();
    console.log("startdddddmmm", myDate);

    let finalDate = moment(myDate).format("MMMM Do YYYY, h:mm a");
    await this.setState({
      startDate: finalDate,
    });
  }

  setStateFromInput = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };
  saveFormData = () => {
    let payment = this.state.payment;
    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let phone = this.state.phone;
    let email = this.state.email;
    let address = this.state.address;
    let city = this.state.city;
    let state = this.state.state;
    let pincode = this.state.pincode;
    let create_account = this.state.create_account;
    let FormData = {
      //   payment,
      first_name,
      last_name,
      phone,
      email,
      address,
      city,
      //   state,
      pincode,
      //   create_account,
    };

    localStorage.setItem("FormData", JSON.stringify(FormData));

    let data = JSON.parse(localStorage.getItem("FormData"));
    if (
      data.first_name !== "" &&
      data.last_name !== "" &&
      data.phone !== "" &&
      data.email !== "" &&
      data.address !== "" &&
      data.city !== "" &&
      data.pincode !== ""
    ) {
      this.setState({
        formDataTrueOrFalse: true,
      });
    } else {
      this.setState({
        formDataTrueOrFalse: false,
      });
    }
  };

  setStateFromCheckbox = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.checked;
    this.setState(obj);

    if (!this.validator.fieldValid(event.target.name)) {
      this.validator.showMessages();
    }
  };

  setBothFunction = (event) => {
    this.saveFormData();
    this.setStateFromCheckbox(event);
  };

  checkhandle(value) {
    this.setState({
      payment: value,
    });
  }

  handleSelection = () => {
    toast.error("Please Fill the Form First");
  };
  onReset = () => {
    this.setState({
      path: [],
      success: false,
      error: false,
      disabled: false,
    });
  };

  onChange = (path) => {
    this.setState({ path: [...path] });
  };

  onFinish = () => {
    this.setState({ isLoading: true });
    // an imaginary api call
    setTimeout(() => {
      if (this.state.path.join("-") === "0-1-2") {
        this.setState({ isLoading: false, success: true, disabled: true });
      } else {
        this.setState({ disabled: true, error: true });
        this.errorTimeout = window.setTimeout(() => {
          this.setState({
            disabled: false,
            error: false,
            isLoading: false,
            path: [],
          });
        }, 2000);
      }
    }, 1000);
  };

  render() {
    const { size, path, disabled, success, error, isLoading } = this.state;
    const { cartItems, symbol, total } = this.props;

    // Paypal Integration
    const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
      this.props.history.push({
        pathname: "/order-success",
        state: {
          payment: payment,
          items: cartItems,
          orderTotal: total,
          symbol: symbol,
        },
      });
    };

    return (
      <div>
        {console.log("infooooooooooo", this.state)}
        {/*SEO Support*/}
        <Helmet>
          <title>Shoop | Repair Info Page</title>
          <meta
            name="description"
            content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses."
          />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"Info"} />

        <section className="section-b-space">
          <div className="container padding-cls">
            <div className="checkout-page">
              <div className="checkout-form">
                {/* <form> */}
                <div className="checkout row justify-content-center">
                  <div className="col-lg-6 col-sm-12 col-xs-12">
                    <div className="checkout-title">
                      <h3>Billing Details</h3>
                    </div>
                    <div className="row check-out">
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <div className="field-label">First Name</div>
                        <input
                          type="text"
                          name="first_name"
                          value={this.state.first_name}
                          onChange={this.setStateFromInput}
                        />
                        {this.validator.message(
                          "first_name",
                          this.state.first_name,
                          "required|alpha"
                        )}
                      </div>
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <div className="field-label">Last Name</div>
                        <input
                          type="text"
                          name="last_name"
                          value={this.state.last_name}
                          onChange={this.setStateFromInput}
                        />
                        {this.validator.message(
                          "last_name",
                          this.state.last_name,
                          "required|alpha"
                        )}
                      </div>
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <div className="field-label">Phone</div>
                        <input
                          type="text"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.setStateFromInput}
                        />
                        {this.validator.message(
                          "phone",
                          this.state.phone,
                          "required|phone"
                        )}
                      </div>
                      <div className="form-group col-md-6 col-sm-6 col-xs-12">
                        <div className="field-label">Email Address</div>
                        <input
                          type="text"
                          name="email"
                          value={this.state.email}
                          onChange={this.setStateFromInput}
                        />
                        {this.validator.message(
                          "email",
                          this.state.email,
                          "required|email"
                        )}
                      </div>
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">Address</div>
                        <input
                          type="text"
                          name="address"
                          value={this.state.address}
                          onChange={this.setStateFromInput}
                          placeholder="Street address"
                        />
                        {this.validator.message(
                          "address",
                          this.state.address,
                          "required|min:20|max:120"
                        )}
                      </div>
                      <div className="form-group col-md-12 col-sm-12 col-xs-12">
                        <div className="field-label">Town/City</div>
                        <input
                          type="text"
                          name="city"
                          value={this.state.city}
                          onChange={this.setStateFromInput}
                        />
                        {this.validator.message(
                          "city",
                          this.state.city,
                          "required|alpha"
                        )}
                      </div>
                      <div className="form-group col-md-12 col-sm-6 col-xs-12">
                        <div className="field-label">Postal Code</div>
                        <input
                          type="text"
                          name="pincode"
                          value={this.state.pincode}
                          onChange={this.setStateFromInput}
                        />
                        {this.validator.message(
                          "pincode",
                          this.state.pincode,
                          "required|integer"
                        )}
                      </div>
                      <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <input
                          type="submit"
                          name="create_account"
                          id="account-option"
                          onClick={this.setBothFunction}
                          //   onClick={this.setStateFromCheckbox}
                        />
                        {/* &ensp;{" "} */}
                        {/* <label htmlFor="account-option">
                          Create An Account?
                        </label> */}
                        {/* {this.validator.message(
                          "checkbox",
                          this.state.create_account,
                          "create_account"
                        )} */}
                      </div>
                    </div>
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
                            <b>Brand :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="prob">
                              {this.state.companyName}
                            </span>
                          </h6>
                        </div>
                        <div className="headind1">
                          <h6 className="h61">
                            <b>Modal :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="prob">{this.state.modalName}</span>
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
                        <div className="headind1">
                          {/* <PatternLock
                            width={300}
                            pointSize={15}
                            size={3}
                            path={this.state.path}
                            onChange={(pattern) => {
                              this.setState({ path: pattern });
                            }}
                            onFinish={() => {
                              // check if the pattern is correct
                            }}
                          />
                          <div className="output">
                            Select the top 3 points starting from the left
                          </div>
                          <div className="output">
                            Output : {this.state.path.join(", ")}
                          </div>
                          {success && (
                            <button
                              style={{ margin: "0 auto", display: "block" }}
                              onClick={this.onReset}
                            >
                              Click here to reset
                            </button>
                          )}
                          <div className="output">
                            Press the up/down arrow keys to increase/decrease
                            the size of the input
                          </div> */}
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
                            <b>Appointment Date :</b>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="prob">{this.state.startDate}</span>
                          </h6>
                        </div>
                        {/* <div className="headind1">
                          <h6 className="h61">
                            <b>Appointment Time
                            :</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="prob">09 : 30</span>
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
                {/* </form> */}
              </div>
            </div>
            <Demo />

            <div className="row justify-content-center">
              <div className="btuun">
                {this.state.formDataTrueOrFalse ? (
                  <Link to={`${process.env.PUBLIC_URL}/paymet`}>
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
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cartList.cart,
  symbol: state.data.symbol,
  total: getCartTotal(state.cartList.cart),
});

export default connect(
  mapStateToProps,
  { removeFromWishlist }
)(Info);
