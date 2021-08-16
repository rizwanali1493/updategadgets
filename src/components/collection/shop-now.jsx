import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../common/breadcrumb";
import {
  filterSort,
  // getVisibleproducts,
  getDeviceTypes,
} from "../../actions/index";
import ProductListItem from "./common/product-list-item";

class ShopNow extends Component {
  constructor() {
    super();
    this.state = {
      colSize: 3,
      products: [],
      clonedProducts: [],
      limit: 5,
      hasMoreItems: true,
      image: "",
    };
  }

  async componentDidMount() {
    await this.props.getDeviceTypes();
    await this.setState({
      products: this.props.data.deviceTypes || [],
      clonedProducts: this.props.data.deviceTypes || [],
    });
    this.fetchMoreItems();
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
    if (this.state.limit >= this.state.products.length) {
      this.setState({ hasMoreItems: false });
      return;
    }
    // a fake async api call
    setTimeout(() => {
      this.setState({
        limit: this.state.limit + 5,
      });
    }, 1000);
  };

  // getVisibleproducts = async (data, filters) => {
  //   await this.props.getVisibleproducts(data, filters);

  //   this.setState({
  //     products: this.props.data.products,
  //     clonedProducts: this.props.data.products,
  //   });
  // };
  handleDeviceTypes = (p) => {
    localStorage.setItem("DeviceTypesData", JSON.stringify(p));
    localStorage.setItem("DeviceType", JSON.stringify(p.name));
  };

  render() {
    let { products, colSize, hasMoreItems } = this.state;
    const { filters } = this.props;
    return (
      <div>
        {console.log("%%%%%%%", this.state)}
        {/*SEO Support*/}
        <Helmet>
          <title>Shoop | Repair</title>
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
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="collection-product-wrapper">
                            <div className="search-count">
                              <h5>
                                Showing Products 1-{this.state.products.length}{" "}
                                Result
                              </h5>
                            </div>
                            <div>
                              <div className="product-wrapper-grid">
                                <div className="container-fluid">
                                  {this.state.products.length > 0 ? (
                                    <InfiniteScroll
                                      dataLength={this.state.limit} //This is important field to render the next data
                                      next={this.fetchMoreItems}
                                      hasMore={hasMoreItems}
                                      loader={<div className="loading-cls" />}
                                      endMessage={
                                        <p className="seen-cls seen-it-cls">
                                          <b>Yay! You have seen it all</b>
                                        </p>
                                      }
                                    >
                                      <div className="row">
                                        {this.state.products
                                          .slice(0, this.state.limit)
                                          .map((products, index) => (
                                            <div
                                              className={`${
                                                colSize === 3
                                                  ? "col-xl-3 col-md-6 col-grid-box"
                                                  : "col-lg-" + colSize
                                              }`}
                                              key={index}
                                            >
                                              {products.name}

                                              <div className="product-box">
                                                <div className="img-wrapper">
                                                  <div
                                                    onClick={() =>
                                                      this.handleDeviceTypes(
                                                        products
                                                      )
                                                    }
                                                    className="front"
                                                  >
                                                    <Link
                                                      to={{
                                                        pathname:
                                                          "/shop-now/" +
                                                          products.name +
                                                          "/",
                                                        myCustomProps: products,
                                                      }}
                                                    >
                                                      <img
                                                        src={products.pictures}
                                                        className="img-fluid"
                                                        alt=""
                                                      />
                                                    </Link>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                      </div>
                                    </InfiniteScroll>
                                  ) : (
                                    <div className="row">
                                      <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                                        <img
                                          src={`${
                                            process.env.PUBLIC_URL
                                          }/assets/images/empty-search.jpg`}
                                          className="img-fluid mb-4"
                                        />
                                        <h3>
                                          Sorry! Couldn't find the product you
                                          were looking For!!!{" "}
                                        </h3>
                                        <p>
                                          Please check if you have misspelt
                                          something or try searching with other
                                          words.
                                        </p>
                                        <Link
                                          to={`${process.env.PUBLIC_URL}/`}
                                          className="btn btn-solid"
                                        >
                                          continue shopping
                                        </Link>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/*------------***end Products Listing Component***---------------*/}
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
  {
    filterSort,
    // getVisibleproducts,
    getDeviceTypes,
  }
)(ShopNow);
