import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import { IntlReducer as Intl, IntlProvider } from "react-redux-multilingual";
import "./index.scss";

// Import custom components
import store from "./store";
import translations from "./constants/translations";
import { getAllProducts } from "./actions";
// import { getcompanyNames } from './actions'

// Layouts
import Home from "./components/layouts/home/home";

//Collection Pages
// import CollectionLeftSidebar from "./components/collection/collection-shop-now";
// import CollectionNoSidebar from "./components/collection/collection-no-sidebar";
// import CollectionRightSidebar from "./components/collection/collection-right-sidebar";
// import CollectionFullWidth from "./components/collection/collection-full-width";
import ShopNow from "./components/collection/shop-now";
import BookRepair from "./components/collection/book-repair";

// Product Pages
import _ShopNow from "./components/products/product";
import Companies from "./components/products/companies";
import Modals from "./components/products/modals";
import Issues from "./components/products/issues";
import Date from "./components/products/date";
import Info from "./components/products/info";
import Paymet from "./components/products/paymet";
import Bystore from "./components/products/bystore";

import ShopCompanies from "./components/shop-products/companies";
import ShopModals from "./components/shop-products/modals";

// import RightSideBar from "./components/products/right-sidebar";
// import NoSideBar from "./components/products/no-sidebar";
// import LeftImage from "./components/products/left-image";
// import RightImage from "./components/products/right-image";
// import Accordian from "./components/products/accordian";
// import ColumnLeft from "./components/products/column-left";
// import ColumnRight from "./components/products/column-right";
// import Column from "./components/products/column";
// import Vertical from "./components/products/vertical";

// Features
import Layout from "./components/app";
import Cart from "./components/cart";
import Compare from "./components/compare/index";
import wishList from "./components/wishlist";
import checkOut from "./components/checkout";
import orderSuccess from "./components/checkout/success-page";

// Extra Pages
import aboutUs from "./components/pages/about-us";
import PageNotFound from "./components/pages/404";
import lookbook from "./components/pages/lookbook";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
// import Search from './components/pages/search'
import Collection from "./components/pages/collection";
import ForgetPassword from "./components/pages/forget-password";
import Contact from "./components/pages/contact";
import Covid from "./components/pages/covid";
import Dashboard from "./components/pages/dashboard";
import Faq from "./components/pages/faq";

// Blog Pages
import BlogPage from "./components/blogs/blog-page";

// Theme Element
import ElementTitle from "./components/features/theme/element-title";
import ElementBanner from "./components/features/theme/element-banner";
import ElementSlider from "./components/features/theme/element-slider";
import ElementCategory from "./components/features/theme/element-category";
import ElementService from "./components/features/theme/element-service";
import ElementRatio from "./components/features/theme/element-ratio";

// Product Elements
import ElementProductBox from "./components/features/product/element-product-box";
import ElementProductSlider from "./components/features/product/element-product-slider";
import ElementProductNoSlider from "./components/features/product/element-product-no-slider";
import ElementMultipleSlider from "./components/features/product/element-multiple-slider";
import ElementProductTab from "./components/features/product/element-product-tab";

// Portfolio Features
import GridCols from "./components/features/portfolio/grid-cols";
import MasonaryGridCols from "./components/features/portfolio/masonary-grid-cols";

class Root extends React.Component {
  render() {
    // store.dispatch(getAllProducts());
    // store.dispatch(getcompanyNames());

    return (
      <Provider store={store}>
        <IntlProvider translations={translations} locale="en">
          <BrowserRouter basename={"/"}>
            <ScrollContext>
              <Switch>
                <Layout>
                  {/*Routes For Layouts*/}
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/`}
                    component={Home}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/shop-now/:name/:name/:id`}
                    exact
                    component={_ShopNow}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/book-repair`}
                    exact
                    component={BookRepair}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/book-repair/:name`}
                    exact
                    component={Companies}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/book-repair/:name/:name`}
                    exact
                    component={Modals}
                  />

                  <Route
                    path={`${
                      process.env.PUBLIC_URL
                    }/book-repair/:name/:name/:name`}
                    exact
                    component={Issues}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/info`}
                    exact
                    component={Info}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/bystore`}
                    exact
                    component={Bystore}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/paymet`}
                    exact
                    component={Paymet}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/date`}
                    exact
                    component={Date}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/shop-now`}
                    exact
                    component={ShopNow}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/shop-now/:name`}
                    exact
                    component={ShopCompanies}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/shop-now/:name/:name`}
                    exact
                    component={ShopModals}
                  />

                  {/*Routes For Features (Product Collection) */}
                  {/* <Route path={`${process.env.PUBLIC_URL}/shop-now/collection`} component={CollectionLeftSidebar}/>
								<Route path={`${process.env.PUBLIC_URL}/no-sidebar/collection`} component={CollectionNoSidebar}/>
								<Route path={`${process.env.PUBLIC_URL}/right-sidebar/collection`} component={CollectionRightSidebar}/>
								<Route path={`${process.env.PUBLIC_URL}/full-width/collection`} component={CollectionFullWidth}/> */}

                  {/*Routes For Single Product*/}
                  {/* <Route path={`${process.env.PUBLIC_URL}/right-sidebar/product/:id`} component={RightSideBar}/>
								<Route path={`${process.env.PUBLIC_URL}/no-sidebar/product/:id`} component={NoSideBar}/>
								<Route path={`${process.env.PUBLIC_URL}/col-left/product/:id`} component={ColumnLeft}/>
								<Route path={`${process.env.PUBLIC_URL}/col-right/product/:id`} component={ColumnRight}/>
								<Route path={`${process.env.PUBLIC_URL}/accordian/product/:id`} component={Accordian}/>
								<Route path={`${process.env.PUBLIC_URL}/column/product/:id`} component={Column}/>
								<Route path={`${process.env.PUBLIC_URL}/left-image/product/:id`} component={LeftImage}/>
								<Route path={`${process.env.PUBLIC_URL}/right-image/product/:id`} component={RightImage}/>
								<Route path={`${process.env.PUBLIC_URL}/vertical/product/:id`} component={Vertical}/> */}

                  {/*Routes For custom Features*/}
                  <Route
                    path={`${process.env.PUBLIC_URL}/cart`}
                    component={Cart}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/wishlist`}
                    component={wishList}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/compare`}
                    component={Compare}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/checkout`}
                    component={checkOut}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/order-success`}
                    component={orderSuccess}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/sales/orders`}
                    component={aboutUs}
                  />

                  {/*Routes For Extra Pages*/}
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/about-us`}
                    component={aboutUs}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/404`}
                    component={PageNotFound}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/lookbook`}
                    component={lookbook}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/login`}
                    component={Login}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/register`}
                    component={Register}
                  />
                  {/* <Route
								//  path={`${process.env.PUBLIC_URL}/pages/search`}
								  component={Search}/> */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/collection`}
                    component={Collection}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/forget-password`}
                    component={ForgetPassword}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/contact`}
                    component={Contact}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/covid`}
                    component={Covid}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/dashboard`}
                    component={Dashboard}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/faq`}
                    component={Faq}
                  />

                  {/*Features*/}
                  {/*Theme Elements*/}
                  <Route
                    path={`${process.env.PUBLIC_URL}/features/element-title`}
                    component={ElementTitle}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/features/element-banner`}
                    component={ElementBanner}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/features/element-slider`}
                    component={ElementSlider}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/features/element-category`}
                    component={ElementCategory}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/features/element-service`}
                    component={ElementService}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/features/element-ratio`}
                    component={ElementRatio}
                  />

                  {/*Product Elements*/}
                  <Route
                    path={`${
                      process.env.PUBLIC_URL
                    }/features/element-product-box`}
                    component={ElementProductBox}
                  />
                  <Route
                    path={`${
                      process.env.PUBLIC_URL
                    }/features/element-product-slider`}
                    component={ElementProductSlider}
                  />
                  <Route
                    path={`${
                      process.env.PUBLIC_URL
                    }/features/element-product-no-slider`}
                    component={ElementProductNoSlider}
                  />
                  <Route
                    path={`${
                      process.env.PUBLIC_URL
                    }/features/element-product-multiple-slider`}
                    component={ElementMultipleSlider}
                  />
                  <Route
                    path={`${
                      process.env.PUBLIC_URL
                    }/features/element-product-tab`}
                    component={ElementProductTab}
                  />

                  {/*Portfolios*/}
                  <Route
                    path={`${
                      process.env.PUBLIC_URL
                    }/features/portfolio-grid/:columns`}
                    component={GridCols}
                  />
                  <Route
                    path={`${
                      process.env.PUBLIC_URL
                    }/features/portfolio-masonary/:columns`}
                    component={MasonaryGridCols}
                  />

                  {/*Blog Pages*/}
                  <Route
                    path={`${process.env.PUBLIC_URL}/blog`}
                    component={BlogPage}
                  />

                  {/* <Route exact path="*" component={PageNotFound} /> */}
                </Layout>
              </Switch>
            </ScrollContext>
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
