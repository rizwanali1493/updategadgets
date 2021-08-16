import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import store from "../../store/index";
// import { useHistory } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import FilterBar from "./common/filter-bar";
// import { getVisibleproducts } from "../../services";
import {
  addToCart,
  addToWishlist,
  addToCompare,
  filterSort,
  getVisibleproducts,
  getcompanyNames,
  passProduct
} from "../../actions";
import ProductListItem from "./common/product-list-item";
// import { useRouteMatch } from "react-router-dom";

// function BlogPost() {
//   let match = useRouteMatch("/blog/:slug");

//   // Do whatever you want with the match...
//   return <div />;
// }
// ------------***These files for sidebar Filter***----------------
// import NewProduct from "../common/new-product";
// import Filter from "./common/filter";
// import StickyBox from "react-sticky-box";

class BookRepair extends Component {
  constructor() {
    super();
    this.state = {
      colSize: 3,
      searchedText: "",
      products: [],
      clonedProducts: [],
      limit: 5,
      hasMoreItems: true,
      image: "",
    };
  }

 async  componentDidMount() {
   await this.props.getcompanyNames();
    console.log("this.props.data.%%%%%%%%",this.props.data.companyNames)
    this.setState({
      products: this.props.data.companyNames,
      clonedProducts: this.props.data.companyNames,
    });
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

  openFilter = () => {
    document.querySelector(".collection-filter").style = "left: -15px";
  };

  searchProductsHandler = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
      products: this.state.clonedProducts,
    });
  };

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

  onEnter = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      let textIs = this.state.searchedText.trim();
      if (textIs) {
        let filteredProducts = [];
        filteredProducts = this.state.products.filter((p) => {
          return (
            p.name.toUpperCase().includes(textIs.toUpperCase()) ||
            p.category.toUpperCase().includes(textIs.toUpperCase())
          );
        });
        this.setState({ products: filteredProducts });
      }
    }
  };

  onSearch = () => {
    let textIs = this.state.searchedText.trim();
    if (textIs) {
      let filteredProducts = [];
      filteredProducts = this.state.products.filter((p) => {
        return (
          p.name.toUpperCase().includes(textIs.toUpperCase()) ||
          p.category.toUpperCase().includes(textIs.toUpperCase())
        );
      });

      this.setState({ products: filteredProducts, searchedText: "" });
    }
  };

  getVisibleproducts = async (data, filters) => {
    await this.props.getVisibleproducts(data, filters);

    this.setState({
      products: this.props.data.products,
      clonedProducts: this.props.data.products,
    });
  };

  onClickHandle(img) {
    this.setState({ image: img });
  }

  // passProduct = async (products) =>{
  //   await this.props.passProduct(products)
  // }

  
  // handlePushClick (products) {
  //   this.props.history.push("/book-repair/" +
  //   {name:products.name} + "/",
  //   {myCustomProps : products} )    
  // }

  render() {
    // let history = useHistory();
    let { products, colSize, hasMoreItems } = this.state;
    const {
      filters,
      addToCart,
      symbol,
      addToWishlist,
      addToCompare,
    } = this.props;
    console.log("filters>>>", filters);
    console.log("filter products>>>", products);

    return (
      <div>
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
                {/* ------------***start side-bar banner***--------------- */}
                {/* <div className="col-sm-3 collection-filter">
                        <StickyBox offsetTop={20} offsetBottom={20}>
                            <div>
                                <Filter/>
                                <NewProduct/>
                                <div className="collection-sidebar-banner">
                                    <a href="#">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/side-banner.png`} className="img-fluid" alt="" />
                                    </a>
                                </div>
                            </div>
                        </StickyBox>
                    </div> */}
                {/* ------------***End side-bar banner***---------------*/}

                <div className="collection-content col">
                  <div className="page-main-content ">
                    <div className="">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="top-banner-wrapper">
                            <a href="#">
                              <img
                                src={`${
                                  process.env.PUBLIC_URL
                                }/assets/images/mega-menu/2.jpg`}
                                className="img-fluid"
                                alt=""
                              />
                            </a>
                            <div className="top-banner-content small-section">
                              <h4>fashion</h4>
                              <h5>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </h5>
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was
                                popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.{" "}
                              </p>
                            </div>
                          </div>
                          <div className="collection-product-wrapper">
                            {/* --------------***Start Filter Bar***-------------- */}

                            <div className="product-top-filter">
                              <div className="container-fluid p-0">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <div className="filter-main-btn">
                                      <span
                                        onClick={this.openFilter}
                                        className="filter-btn btn btn-theme"
                                      >
                                        <i
                                          className="fa fa-filter"
                                          aria-hidden="true"
                                        />{" "}
                                        Filter
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <div className="product-filter-content">
                                      <div className="search-count">
                                        <h5>
                                          Showing Products 1-{products.length}{" "}
                                          Result
                                        </h5>
                                      </div>
                                      <div className="collection-view">
                                        <ul>
                                          <li>
                                            <i
                                              className="fa fa-th grid-layout-view"
                                              onClick={this.gridLayout}
                                            />
                                          </li>
                                          <li>
                                            <i
                                              className="fa fa-list-ul list-layout-view"
                                              onClick={this.listLayout}
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="collection-grid-view">
                                        <ul>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/2.png`}
                                              alt=""
                                              className="product-2-layout-view"
                                              onClick={() => this.LayoutView(6)}
                                            />
                                          </li>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/3.png`}
                                              alt=""
                                              className="product-3-layout-view"
                                              onClick={() => this.LayoutView(4)}
                                            />
                                          </li>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/4.png`}
                                              alt=""
                                              className="product-4-layout-view"
                                              onClick={() => this.LayoutView(3)}
                                            />
                                          </li>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/6.png`}
                                              alt=""
                                              className="product-6-layout-view"
                                              onClick={() => this.LayoutView(2)}
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="product-page-filter">
                                        <select
                                          onChange={(e) =>
                                            this.props.filterSort(
                                              e.target.value
                                            )
                                          }
                                          onClick={() =>
                                            this.getVisibleproducts(
                                              products,
                                              filters
                                            )
                                          }
                                        >
                                          <option value="">
                                            Sorting items
                                          </option>
                                          <option value="HighToLow">
                                            Price: High to Low
                                          </option>
                                          <option value="LowToHigh">
                                            Price: Low to High
                                          </option>
                                          <option value="Newest">
                                            Newest Items
                                          </option>
                                          <option value="AscOrder">
                                            Sort By Name: A To Z
                                          </option>
                                          <option value="DescOrder">
                                            Sort By Name: Z To A
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    {/* <FilterBar
                                      onLayoutViewClicked={(colSize) =>
                                        this.LayoutViewClicked(colSize)
                                      }
                                    /> */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* --------------***End Filter Bar***-------------- */}

                            {/* ----------------***Start Search component***----------------- */}

                            <section className="authentication-page section-b-space">
                              <div className="container">
                                <section className="search-block">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-lg-6 offset-lg-3">
                                        {/* <form className="form-header"> */}
                                        <div className="input-group">
                                          <input
                                            type="searchedText"
                                            className="form-control"
                                            // className="form-control"
                                            name={"searchedText"}
                                            value={this.state.searchedText}
                                            aria-label="Amount (to the nearest dollar)"
                                            placeholder="Search Products......"
                                            onChange={(e) =>
                                              this.searchProductsHandler(e)
                                            }
                                            onKeyDown={this.onEnter}
                                          />
                                          <div className="input-group-append">
                                            <button
                                              onClick={this.onSearch}
                                              className="btn btn-solid"
                                            >
                                              <i className="fa fa-search" />
                                              Searched
                                            </button>
                                          </div>
                                        </div>
                                        {/* </form> */}
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </section>
                            {/* ----------------***end Search component***----------------- */}

                            {/*------------***start Products Listing Component***---------------*/}
                                            { console.log("%%%%%%%",this.state)}
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
                                              {/* <ProductListItem
                                                product={product}
                                                symbol={symbol}
                                                onAddToCompareClicked={() =>
                                                  addToCompare(product)
                                                }
                                                onAddToWishlistClicked={() =>
                                                  addToWishlist(product)
                                                }
                                                onAddToCartClicked={addToCart}
                                                key={index}
                                              /> */}

                                              <div className="product-box">
                                                <div className="img-wrapper">
                                                  <div
                                                  // onClick={()=> this.passProduct(products,index)}
                                                  // onClick={()=>this.handlePushClick(products)}
                                                  className="front">

                                                    <Link
                                                      to={{
                                                        pathname:
                                                          "/book-repair/" +
                                                          products.name + "/",
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
                                                  <ul className="product-thumb-list">
                                                    <li
                                                      className={`grid_thumb_img ${
                                                        products.pictures ===
                                                        this.state.image
                                                          ? "active"
                                                          : ""
                                                      }`}
                                                    >
                                                      <a
                                                        href="javascript:void(0)"
                                                        title="Add to Wishlist"
                                                      >
                                                        <img
                                                          src={`${
                                                            products.pictures
                                                          }`}
                                                          onClick={() =>
                                                            this.onClickHandle(
                                                              products.pictures
                                                            )
                                                          }
                                                        />
                                                      </a>
                                                    </li>
                                                  </ul>
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
  { addToCart, addToWishlist, addToCompare, filterSort, getVisibleproducts, getcompanyNames }

  // searchProductsHandler,
)(BookRepair);











import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import store from "../../store/index";

import Breadcrumb from "../common/breadcrumb";
import FilterBar from "../collection/common/filter-bar";
// import { getVisibleproducts } from "../../services";
import {
  addToCart,
  addToWishlist,
  addToCompare,
  filterSort,
  getVisibleproducts,
  getcompanyNames,
  postProductModal
} from "../../actions/index";
import ProductListItem from "../collection/common/product-list-item";

// ------------***These files for sidebar Filter***----------------
// import NewProduct from "../common/new-product";
// import Filter from "./common/filter";
// import StickyBox from "react-sticky-box";

class Companies extends Component {
  constructor() {
    super();
    this.state = {
      colSize: 3,
      searchedText: "",
      productName: "",
      productModal: [],
      clonedProductModal: [],
      limit: 5,
      hasMoreItems: true,
      image: "",
      index: "",
    };
  }

  async componentDidMount() {

    // console.log("$$$$$$$$$$$$$$$$$$$$$$$.%%%%%%%%",this.props.data.postProductModal || "")


    console.log("myCustomProps %%%%%%%%",this.props.location.products || "")
    console.log("getProductModal %%%%%%%%",this.props.data.getProductModal || "")


    if(this.props.location.myCustomProps){
      await this.postProductModal(this.props.location.myCustomProps);
      this.setState({
        productName: this.props.location.myCustomProps.name,
        productModal: this.props.location.myCustomProps.modals,
        clonedProductModal: this.props.location.myCustomProps.modals,
      });
    }else{
      this.setState({
        productName: this.props.data.getProductModal.name,
        productModal: this.props.data.getProductModal.modals,
        clonedProductModal: this.props.data.getProductModal.modals,
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

  openFilter = () => {
    document.querySelector(".collection-filter").style = "left: -15px";
  };

  searchProductsHandler = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
      productModal: this.state.clonedProducts,
    });
  };

  fetchMoreItems = () => {
    if (this.state.limit >= this.state.productModal.length) {
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

  onEnter = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      let textIs = this.state.searchedText.trim();
      if (textIs) {
        let filteredProducts = [];
        filteredProducts = this.state.productModal.filter((p) => {
          return (
            p.name.toUpperCase().includes(textIs.toUpperCase()) ||
            p.category.toUpperCase().includes(textIs.toUpperCase())
          );
        });
        this.setState({ productModal: filteredProducts });
      }
    }
  };

  onSearch = () => {
    let textIs = this.state.searchedText.trim();
    if (textIs) {
      let filteredProducts = [];
      filteredProducts = this.state.productModal.filter((p) => {
        return (
          p.name.toUpperCase().includes(textIs.toUpperCase()) ||
          p.category.toUpperCase().includes(textIs.toUpperCase())
        );
      });

      this.setState({ productModal: filteredProducts, searchedText: "" });
    }
  };

  getVisibleproducts = async (data, filters) => {
    await this.props.getVisibleproducts(data, filters);

    this.setState({
        productModal: this.state.productModal,
      clonedProductModal: this.state.productModal,
    });
  };

  onClickHandle(img) {
    this.setState({ image: img });
  }

  postProductModal = async (products) =>{
    console.log("%%%%%%%%%%%%%&&&&&&&",products)
    await this.props.postProductModal(products)
  }
  handlePushClick (products) {
    this.props.history.push("/book-repair/" +
    {name : this.state.productName} + "/" +
    {name:products.name} + "/"  , 
    {myCustomProps : products} )       
  }

  // handlePushClick (products) {
  //   this.props.history.push("/book-repair/" +
  //   products.name + "/",
  //   {myCustomProps : products} )
    
  // }

  render() {
    let { productModal, colSize, hasMoreItems } = this.state;
    const {
      filters,
      addToCart,
      symbol,
      addToWishlist,
      addToCompare,
    } = this.props;

    return (
      <div>
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
                {/* ------------***start side-bar banner***--------------- */}
                {/* <div className="col-sm-3 collection-filter">
                        <StickyBox offsetTop={20} offsetBottom={20}>
                            <div>
                                <Filter/>
                                <NewProduct/>
                                <div className="collection-sidebar-banner">
                                    <a href="#">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/side-banner.png`} className="img-fluid" alt="" />
                                    </a>
                                </div>
                            </div>
                        </StickyBox>
                    </div> */}
                {/* ------------***End side-bar banner***---------------*/}

                <div className="collection-content col">
                  <div className="page-main-content ">
                    <div className="">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="top-banner-wrapper">
                            <a href="#">
                              <img
                                src={`${
                                  process.env.PUBLIC_URL
                                }/assets/images/mega-menu/2.jpg`}
                                className="img-fluid"
                                alt=""
                              />
                            </a>
                            <div className="top-banner-content small-section">
                              <h4>fashion</h4>
                              <h5>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </h5>
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was
                                popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.{" "}
                              </p>
                            </div>
                          </div>
                          <div className="collection-product-wrapper">
                            {/* --------------***Start Filter Bar***-------------- */}

                            <div className="product-top-filter">
                              <div className="container-fluid p-0">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <div className="filter-main-btn">
                                      <span
                                        onClick={this.openFilter}
                                        className="filter-btn btn btn-theme"
                                      >
                                        <i
                                          className="fa fa-filter"
                                          aria-hidden="true"
                                        />{" "}
                                        Filter
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <div className="product-filter-content">
                                      <div className="search-count">
                                        <h5>
                                          Showing Products 1-{this.state.productModal.length}{" "}
                                          Result
                                        </h5>
                                      </div>
                                      <div className="collection-view">
                                        <ul>
                                          <li>
                                            <i
                                              className="fa fa-th grid-layout-view"
                                              onClick={this.gridLayout}
                                            />
                                          </li>
                                          <li>
                                            <i
                                              className="fa fa-list-ul list-layout-view"
                                              onClick={this.listLayout}
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="collection-grid-view">
                                        <ul>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/2.png`}
                                              alt=""
                                              className="product-2-layout-view"
                                              onClick={() => this.LayoutView(6)}
                                            />
                                          </li>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/3.png`}
                                              alt=""
                                              className="product-3-layout-view"
                                              onClick={() => this.LayoutView(4)}
                                            />
                                          </li>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/4.png`}
                                              alt=""
                                              className="product-4-layout-view"
                                              onClick={() => this.LayoutView(3)}
                                            />
                                          </li>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/6.png`}
                                              alt=""
                                              className="product-6-layout-view"
                                              onClick={() => this.LayoutView(2)}
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="product-page-filter">
                                        <select
                                          onChange={(e) =>
                                            this.props.filterSort(
                                              e.target.value
                                            )
                                          }
                                          onClick={() =>
                                            this.getVisibleproducts(
                                              this.state.productModal,
                                              filters
                                            )
                                          }
                                        >
                                          <option value="">
                                            Sorting items
                                          </option>
                                          <option value="HighToLow">
                                            Price: High to Low
                                          </option>
                                          <option value="LowToHigh">
                                            Price: Low to High
                                          </option>
                                          <option value="Newest">
                                            Newest Items
                                          </option>
                                          <option value="AscOrder">
                                            Sort By Name: A To Z
                                          </option>
                                          <option value="DescOrder">
                                            Sort By Name: Z To A
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    {/* <FilterBar
                                      onLayoutViewClicked={(colSize) =>
                                        this.LayoutViewClicked(colSize)
                                      }
                                    /> */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* --------------***End Filter Bar***-------------- */}

                            {/* ----------------***Start Search component***----------------- */}

                            <section className="authentication-page section-b-space">
                              <div className="container">
                                <section className="search-block">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-lg-6 offset-lg-3">
                                        {/* <form className="form-header"> */}
                                        <div className="input-group">
                                          <input
                                            type="searchedText"
                                            className="form-control"
                                            // className="form-control"
                                            name={"searchedText"}
                                            value={this.state.searchedText}
                                            aria-label="Amount (to the nearest dollar)"
                                            placeholder="Search Products......"
                                            onChange={(e) =>
                                              this.searchProductsHandler(e)
                                            }
                                            onKeyDown={this.onEnter}
                                          />
                                          <div className="input-group-append">
                                            <button
                                              onClick={this.onSearch}
                                              className="btn btn-solid"
                                            >
                                              <i className="fa fa-search" />
                                              Searched
                                            </button>
                                          </div>
                                        </div>
                                        {/* </form> */}
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </section>
                            {/* ----------------***end Search component***----------------- */}

                            {/*------------***start Products Listing Component***---------------*/}

                            <div>
                              <div className="product-wrapper-grid">
                                <div className="container-fluid">
                                  {
                                  console.log("check length:::::::::",this.state.productModal.length),
                                  this.state.productModal.length > 0 ? (
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
                                        {this.state.productModal
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
                                              {/* <ProductListItem
                                                product={product}
                                                symbol={symbol}
                                                onAddToCompareClicked={() =>
                                                  addToCompare(product)
                                                }
                                                onAddToWishlistClicked={() =>
                                                  addToWishlist(product)
                                                }
                                                onAddToCartClicked={addToCart}
                                                key={index}
                                              /> */}

                                              <div className="product-box">
                                                <div className="img-wrapper">
                                                  <div
                                                  // onClick={()=> this.postProductModal(products,index)}
                                                  // onClick={()=>this.handlePushClick(products)}
                                                  
                                                  className="front">
                                                  <Link
                                                      to={{
                                                        pathname:
                                                          "/book-repair/" +this.state.productName + "/"+
                                                          products.name + "/",
                                                          myCustomProps: products,
                                                      }}
                                                    >
                                                      <img
                                                        src={products.image}
                                                        className="img-fluid"
                                                        alt=""
                                                      />
                                                    </Link>
                                                  </div>
                                                  <ul className="product-thumb-list">
                                                    <li
                                                      className={`grid_thumb_img ${
                                                        products.pictures ===
                                                        this.state.image
                                                          ? "active"
                                                          : ""
                                                      }`}
                                                    >
                                                      <a
                                                        href="javascript:void(0)"
                                                        title="Add to Wishlist"
                                                      >
                                                        <img
                                                          src={`${
                                                            products.pictures
                                                          }`}
                                                          onClick={() =>
                                                            this.onClickHandle(
                                                              products.pictures
                                                            )
                                                          }
                                                        />
                                                      </a>
                                                    </li>
                                                  </ul>
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
  { addToCart, addToWishlist, addToCompare, filterSort, getVisibleproducts, postProductModal }

  // searchProductsHandler,
)(Companies);









import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import store from "../../store/index";

import Breadcrumb from "../common/breadcrumb";
import FilterBar from "../collection/common/filter-bar";
// import { getVisibleproducts } from "../../services";
import {
  addToCart,
  addToWishlist,
  addToCompare,
  filterSort,
  getVisibleproducts,
  getcompanyNames,
  getDeviceIssues,
  postDeviceIssues,
} from "../../actions/index";
import ProductListItem from "../collection/common/product-list-item";

// ------------***These files for sidebar Filter***----------------
// import NewProduct from "../common/new-product";
// import Filter from "./common/filter";
// import StickyBox from "react-sticky-box";

class Modals extends Component {
  constructor() {
    super();
    this.state = {
      colSize: 3,
      searchedText: "",
      issues: [],
      clonedIssues: [],
      limit: 5,
      hasMoreItems: true,
      image: "",
    };
  }

  async componentDidMount() {
    //  await store.dispatch(getcompanyNames());
    await this.props.getDeviceIssues();
    console.log("@@@@@@@@@@@", this.props.data.getDeviceIssues);
    if (this.props.location.myCustomProps) {
      await this.postDeviceIssues(this.props.location.myCustomProps.name);
      this.setState({
        modalName: this.props.location.myCustomProps.name,
        issues: this.props.data.getDeviceIssues,
        clonedIssues: this.props.data.getDeviceIssues,
      });
    } else {
      this.setState({
        modalName: this.props.location.getDeviceName,
        issues: this.props.data.getDeviceIssues,
        clonedIssues: this.props.data.getDeviceIssues,
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

  openFilter = () => {
    document.querySelector(".collection-filter").style = "left: -15px";
  };

  searchProductsHandler = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
      products: this.state.clonedProducts,
    });
  };

  fetchMoreItems = () => {
    console.log("**********", this.state.limit)
    console.log("**********", this.state.issues)
    if (this.state.limit >= this.state.issues.length) {
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

  onEnter = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      let textIs = this.state.searchedText.trim();
      if (textIs) {
        let filteredProducts = [];
        filteredProducts = this.state.products.filter((p) => {
          return (
            p.name.toUpperCase().includes(textIs.toUpperCase()) ||
            p.category.toUpperCase().includes(textIs.toUpperCase())
          );
        });
        this.setState({ products: filteredProducts });
      }
    }
  };

  onSearch = () => {
    let textIs = this.state.searchedText.trim();
    if (textIs) {
      let filteredProducts = [];
      filteredProducts = this.state.products.filter((p) => {
        return (
          p.name.toUpperCase().includes(textIs.toUpperCase()) ||
          p.category.toUpperCase().includes(textIs.toUpperCase())
        );
      });

      this.setState({ products: filteredProducts, searchedText: "" });
    }
  };

  getVisibleproducts = async (data, filters) => {
    await this.props.getVisibleproducts(data, filters);

    this.setState({
      products: this.props.data.products,
      clonedProducts: this.props.data.products,
    });
  };

  onClickHandle(img) {
    this.setState({ image: img });
  }

  postDeviceIssues = async (name) => {
    console.log("issues %%%%%%&&&&&&&", name);
    await this.props.postDeviceIssues(name);
  };

  render() {
    let { products, colSize, hasMoreItems } = this.state;
    const {
      filters,
      addToCart,
      symbol,
      addToWishlist,
      addToCompare,
    } = this.props;
    console.log("Render >>>");

    return (

      <div>
            {
    console.log("return >>>")

    }
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
                {/* ------------***start side-bar banner***--------------- */}
                {/* <div className="col-sm-3 collection-filter">
                        <StickyBox offsetTop={20} offsetBottom={20}>
                            <div>
                                <Filter/>
                                <NewProduct/>
                                <div className="collection-sidebar-banner">
                                    <a href="#">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/side-banner.png`} className="img-fluid" alt="" />
                                    </a>
                                </div>
                            </div>
                        </StickyBox>
                    </div> */}
                {/* ------------***End side-bar banner***---------------*/}

                <div className="collection-content col">
                  <div className="page-main-content ">
                    <div className="">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="top-banner-wrapper">
                            <a href="#">
                              <img
                                src={`${
                                  process.env.PUBLIC_URL
                                }/assets/images/mega-menu/2.jpg`}
                                className="img-fluid"
                                alt=""
                              />
                            </a>
                            <div className="top-banner-content small-section">
                              <h4>fashion</h4>
                              <h5>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </h5>
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was
                                popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.{" "}
                              </p>
                            </div>
                          </div>
                          <div className="collection-product-wrapper">
                            {/* --------------***Start Filter Bar***-------------- */}

                            <div className="product-top-filter">
                              <div className="container-fluid p-0">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <div className="filter-main-btn">
                                      <span
                                        onClick={this.openFilter}
                                        className="filter-btn btn btn-theme"
                                      >
                                        <i
                                          className="fa fa-filter"
                                          aria-hidden="true"
                                        />{" "}
                                        Filter
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <div className="product-filter-content">
                                      <div className="search-count">
                                        <h5>
                                          Showing Products 1-
                                          {this.state.issues.length} Result
                                        </h5>
                                      </div>
                                      <div className="collection-view">
                                        <ul>
                                          <li>
                                            <i
                                              className="fa fa-th grid-layout-view"
                                              onClick={this.gridLayout}
                                            />
                                          </li>
                                          <li>
                                            <i
                                              className="fa fa-list-ul list-layout-view"
                                              onClick={this.listLayout}
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="collection-grid-view">
                                        <ul>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/2.png`}
                                              alt=""
                                              className="product-2-layout-view"
                                              onClick={() => this.LayoutView(6)}
                                            />
                                          </li>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/3.png`}
                                              alt=""
                                              className="product-3-layout-view"
                                              onClick={() => this.LayoutView(4)}
                                            />
                                          </li>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/4.png`}
                                              alt=""
                                              className="product-4-layout-view"
                                              onClick={() => this.LayoutView(3)}
                                            />
                                          </li>
                                          <li>
                                            <img
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/icon/6.png`}
                                              alt=""
                                              className="product-6-layout-view"
                                              onClick={() => this.LayoutView(2)}
                                            />
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="product-page-filter">
                                        <select
                                          onChange={(e) =>
                                            this.props.filterSort(
                                              e.target.value
                                            )
                                          }
                                          onClick={() =>
                                            this.getVisibleproducts(
                                              products,
                                              filters
                                            )
                                          }
                                        >
                                          <option value="">
                                            Sorting items
                                          </option>
                                          <option value="HighToLow">
                                            Price: High to Low
                                          </option>
                                          <option value="LowToHigh">
                                            Price: Low to High
                                          </option>
                                          <option value="Newest">
                                            Newest Items
                                          </option>
                                          <option value="AscOrder">
                                            Sort By Name: A To Z
                                          </option>
                                          <option value="DescOrder">
                                            Sort By Name: Z To A
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    {/* <FilterBar
                                      onLayoutViewClicked={(colSize) =>
                                        this.LayoutViewClicked(colSize)
                                      }
                                    /> */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* --------------***End Filter Bar***-------------- */}

                            {/* ----------------***Start Search component***----------------- */}

                            <section className="authentication-page section-b-space">
                              <div className="container">
                                <section className="search-block">
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-lg-6 offset-lg-3">
                                        {/* <form className="form-header"> */}
                                        <div className="input-group">
                                          <input
                                            type="searchedText"
                                            className="form-control"
                                            // className="form-control"
                                            name={"searchedText"}
                                            value={this.state.searchedText}
                                            aria-label="Amount (to the nearest dollar)"
                                            placeholder="Search Products......"
                                            onChange={(e) =>
                                              this.searchProductsHandler(e)
                                            }
                                            onKeyDown={this.onEnter}
                                          />
                                          <div className="input-group-append">
                                            <button
                                              onClick={this.onSearch}
                                              className="btn btn-solid"
                                            >
                                              <i className="fa fa-search" />
                                              Searched
                                            </button>
                                          </div>
                                        </div>
                                        {/* </form> */}
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </section>
                            {/* ----------------***end Search component***----------------- */}

                            {/*------------***start Products Listing Component***---------------*/}

                            <div>
                              <div className="product-wrapper-grid">
                                <div className="container-fluid">
                                  {this.state.issues.length > 0 ? (
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
                                        {this.state.issues
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
                                              {/* <ProductListItem
                                                product={product}
                                                symbol={symbol}
                                                onAddToCompareClicked={() =>
                                                  addToCompare(product)
                                                }
                                                onAddToWishlistClicked={() =>
                                                  addToWishlist(product)
                                                }
                                                onAddToCartClicked={addToCart}
                                                key={index}
                                              /> */}

                                              <div className="product-box">
                                                <div className="img-wrapper">
                                                  <div className="front">
                                                    <Link
                                                      to={{
                                                        pathname:
                                                          "/book-repair/" +
                                                          products.name,
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
                                                  <ul className="product-thumb-list">
                                                    <li
                                                      className={`grid_thumb_img ${
                                                        products.pictures ===
                                                        this.state.image
                                                          ? "active"
                                                          : ""
                                                      }`}
                                                    >
                                                      <a
                                                        href="javascript:void(0)"
                                                        title="Add to Wishlist"
                                                      >
                                                        <img
                                                          src={`${
                                                            products.pictures
                                                          }`}
                                                          onClick={() =>
                                                            this.onClickHandle(
                                                              products.pictures
                                                            )
                                                          }
                                                        />
                                                      </a>
                                                    </li>
                                                  </ul>
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
    addToCart,
    addToWishlist,
    addToCompare,
    filterSort,
    getVisibleproducts,
    getDeviceIssues,
    postDeviceIssues,
  }

  // searchProductsHandler,
)(Modals);
