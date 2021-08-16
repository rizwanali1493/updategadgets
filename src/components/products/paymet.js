import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../common/breadcrumb";
import "./stylebox.css";
import {
  filterSort,
  getVisibleproducts,
  postCompanyNames_Modal,
} from "../../actions/index";
import { issues } from "../../data2";

class Paymet extends Component {
  constructor() {
    super();
    this.state = {
      colSize: 3,
      productName: "",
      companiesNames_Modal: [],
      clonedCompaniesNames_Modal: [],
      limit: 5,
      hasMoreItems: true,
      image: "",
      index: "",
    };
  }

  async componentDidMount() {
    if (this.props.location.myCustomProps) {
      await this.postCompanyNames_Modal(this.props.location.myCustomProps);
      await this.setState({
        productName: this.props.location.myCustomProps.name,
        companiesNames_Modal: this.props.location.myCustomProps.modals,
        clonedCompaniesNames_Modal: this.props.location.myCustomProps.modals,
      });
    } else {
      await this.setState({
        // productName: this.props.data.name,
        // companiesNames_Modal: this.props.data.postedCompanyNames_Modal.modals,
        // clonedCompaniesNames_Modal: this.props.data.postedCompanyNames_Modal
        //   .modals,
      });
    }
    this.fetchMoreItems();
  }
  //List Layout View
  listLayout() {
    document.querySelector(".collection-grid-view").style = "opacity:0";
    document.querySelector(".product-wrapper-grid").style = "opacity:0.2";
    document.querySelector(".product-wrapper-grid").classList.add("list-view");
    var elems = document.querySelector(".infinite-scroll-component .row")
      .childNodes;
    [].forEach.call(elems, function(el) {
      el.className = "";
      el.classList.add("col-lg-12");
    });
    setTimeout(function() {
      document.querySelector(".product-wrapper-grid").style = "opacity: 1";
    }, 500);
  }

  //Grid Layout View
  gridLayout() {
    document.querySelector(".collection-grid-view").style = "opacity:1";
    document
      .querySelector(".product-wrapper-grid")
      .classList.remove("list-view");
    var elems = document.querySelector(".infinite-scroll-component .row")
      .childNodes;
    [].forEach.call(elems, function(el) {
      el.className = "";
      el.classList.add("col-lg-3");
    });
  }

  // Layout Column View
  LayoutView = (colSize) => {
    if (
      !document
        .querySelector(".product-wrapper-grid")
        .classList.contains("list-view")
    ) {
      var elems = document.querySelector(".infinite-scroll-component .row")
        .childNodes;
      [].forEach.call(elems, function(el) {
        el.className = "";
        el.classList.add("col-lg-" + colSize);
      });
    }

    this.LayoutViewClicked(colSize);
  };

  LayoutViewClicked(colums) {
    this.setState({
      colSize: colums,
    });
  }

  fetchMoreItems = () => {
    if (this.state.limit >= []) {
      this.setState({ hasMoreItems: false });
      return;
    }
    // a fake async api call
    setTimeout(() => {
      this.setState({
        limit: this.state.limit + 5,
      });
    }, 3000);
  };

  getVisibleproducts = async (data, filters) => {
    await this.props.getVisibleproducts(data, filters);

    this.setState({
      companiesNames_Modal: this.state.companiesNames_Modal,
      clonedCompaniesNames_Modal: this.state.companiesNames_Modal,
    });
  };

  postCompanyNames_Modal = async (postedCompanyNames_Modal) => {
    console.log("%%%%%%%%%%%%%&&&&&&&", postedCompanyNames_Modal);
    await this.props.postCompanyNames_Modal(postedCompanyNames_Modal);
  };

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

        <Breadcrumb title={"Payment"} />

        <section className="section-b-space">
          <div className="collection-wrapper">
            <div className="container">
              <div className="row">
                <div className="collection-content col">
                  <div className="page-main-content ">
                    <div className="">
                      <div className="row justify-content-center">
                        <h2>slect Payment method</h2>
                      </div>
                      <div className="row justify-content-center">
                        <div class="col-md-3 text-center">
                          <Link
                            to={`${process.env.PUBLIC_URL}/bystore`}
                            className="btn btn-solid"
                            id="topmrg"
                          >
                            <div className="slect">
                              <h3>
                                <br />
                                <br />
                                By Store
                              </h3>
                            </div>
                          </Link>
                        </div>
                        <div class="col-md-3 text-center">
                          <a
                            className="btn btn-solid"
                            id="topmrg"
                            href="https://www.sandbox.paypal.com/checkoutnow?locale.x=en_US&fundingSource=paypal&sessionID=0265a95518_mtk6ndc6mzq&buttonSessionID=f469abf12a_mtk6ndc6mzq&env=sandbox&fundingOffered=paypal&logLevel=warn&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9hcGkvY2hlY2tvdXQuanMifQ&uid=530f1af97d&version=4&token=EC-4TS12687B4337554G&xcomponent=1"
                          >
                            <div className="slect">
                              <h3>
                                <br />
                                <br />
                                By Online
                              </h3>
                            </div>
                          </a>
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
)(Paymet);
