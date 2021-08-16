import React, {Component} from 'react';
// import {searchProductsHandler} from '../../actions/index';
import Breadcrumb from "../common/breadcrumb";
import { connect } from 'react-redux'
import {getVisibleproducts} from '../../services/index';

class Search extends Component {

    constructor (props) {
        super(props);
        this.state={
            products: "",
        }

    }

    render (){
    


        return (
            <div>
                {/* <Breadcrumb title={'Search'}/> */}
                
                
                {/*Search section*/}
                <section className="authentication-page section-b-space">
                    <div className="container">
                        <section className="search-block">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3">
                                        <form className="form-header">
                                            <div className="input-group">
                                                <input type="text" className="form-control"
                                                       name ={"text"}
                                                       value={this.props.text}
                                                       aria-label="Amount (to the nearest dollar)"
                                                       placeholder="Search Products......"
                                                       onChange={(e)=>this.props.searchProductsHandler(e)}
                                                       onKeyDown={this.props.onEnter}
                                                       />                                                       
                                                    <div className="input-group-append">
                                                        <button onClick={this.props.onSearch} className="btn btn-solid"><i
                                                            className="fa fa-search"></i>Searched
                                                        </button>
                                                    </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

            </div>
        )
    }
}
export default Search;









// import React, {Component} from 'react';
// import { connect } from 'react-redux'
// import {Link} from 'react-router-dom';
// import InfiniteScroll from 'react-infinite-scroll-component';


// import { getTotal, getCartProducts } from '../../../reducers'
// import { addToCart, addToWishlist, addToCompare } from '../../../actions'
// import {getVisibleproducts, onSearch} from '../../../services';
// import ProductListItem from "./product-list-item";

// class ProductListing extends Component {

//     constructor (props) {
//         super (props)

//         this.state = { limit: 5, hasMoreItems: true };

//     }

//     componentWillMount(){
//         this.fetchMoreItems();
//     }

//     fetchMoreItems = () => {
//         if (this.state.limit >= this.props.products.length) {
//             this.setState({ hasMoreItems: false });
//             return;
//         }
//         // a fake async api call
//         setTimeout(() => {
//             this.setState({
//                 limit: this.state.limit + 5
//             });
//         }, 3000);


//     }

//     render (){
//         const {addToCart, symbol, addToWishlist, addToCompare} = this.props;
//         console.log(this.props.colSize)
//         return (
//             <div>
//                 <div className="product-wrapper-grid">
//                     <div className="container-fluid">
//                         {this.props.products.length > 0 ?
//                             <InfiniteScroll
//                                 dataLength={this.state.limit} //This is important field to render the next data
//                                 next={this.fetchMoreItems}
//                                 hasMore={this.state.hasMoreItems}
//                                 loader={<div className="loading-cls"></div>}
//                                 endMessage={
//                                     <p className="seen-cls seen-it-cls">
//                                         <b>Yay! You have seen it all</b>
//                                     </p>
//                                 }
//                             >
//                                 <div className="row">
//                                     { this.props.products.slice(0, this.state.limit).map((product, index) =>
//                                         <div className={`${this.props.colSize===3?'col-xl-3 col-md-6 col-grid-box':'col-lg-'+this.props.colSize}`} key={index}>
//                                         <ProductListItem product={this.props.product} symbol={symbol}
//                                                          onAddToCompareClicked={() => addToCompare(product)}
//                                                          onAddToWishlistClicked={() => addToWishlist(product)}
//                                                          onAddToCartClicked={addToCart} key={index}/>
//                                         </div>)
//                                     }
//                                 </div>
//                             </InfiniteScroll>
//                             :
//                             <div className="row">
//                                 <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
//                                     <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`} className="img-fluid mb-4" />
//                                     <h3>Sorry! Couldn't find the product you were looking For!!!    </h3>
//                                     <p>Please check if you have misspelt something or try searching with other words.</p>
//                                     <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">continue shopping</Link>
//                                 </div>
//                             </div>
//                         }
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// const mapStateToProps = (state) => ({
//     // products: getVisibleproducts(state.data, state.filters),
//     // products:onSearch(state.data, state.filters.searchProducts),
//     symbol: state.data.symbol,
// })

// export default connect(
//     mapStateToProps, {addToCart, addToWishlist, addToCompare}
// )(ProductListing)





/////////shop-now

// import React, {Component} from 'react';
// import {Helmet} from 'react-helmet'
// import Breadcrumb from "../common/breadcrumb";
// import NewProduct from "../common/new-product";
// import Filter from "./common/filter";
// import FilterBar from "./common/filter-bar";
// import ProductListing from "./common/product-listing";
// import StickyBox from "react-sticky-box";
// import Search from '../pages/search';
// import {getVisibleproducts} from '../../services';
// // import {searchProductsHandler} from '../../actions/index';
// import { connect } from 'react-redux'




// class ShopNow extends Component {
//     constructor(){
//         super();
//         this.state={
//           layoutColumns:2,
//           text: "",
//           products:this.props.products,

//         }
//     }

//     LayoutViewClicked(colums) {
//         this.setState({
//             layoutColumns:colums

//         })
//     }

//     openFilter = () => {
//         document.querySelector(".collection-filter").style = "left: -15px";
//     }
//     searchProductsHandler =(e) =>{
//         let {name, value} = e.target;
//         this.setState({
//             [name] : value
//         })

//     }
//     onSearch = (searchProducts) =>{
//     let text = searchProducts;
//     if(text){
//         return(
//             this.state.products.filter((p) =>{
//                 return(
//                     p.name.toUppercase().includes(this.state.text.toUppercase()) ||
//                     p.category.toUppercase().includes(this.state.text.toUppercase())
//                 );
//             })

//         )
//     }

// }
    
//     render (){
//         // const {products} = this.props;
//         console.log('this.props.filters.searchProducts',this.state.text);

//         return (
//             <div>
//                 {/*SEO Support*/}
//                 <Helmet>
//                     <title>MultiKart | Collection of Products</title>
//                     <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
//                 </Helmet>
//                 {/*SEO Support End */}

//                 <Breadcrumb title={'Collection'}/>

//                 <section className="section-b-space">
//                     <div className="collection-wrapper">
//                         <div className="container">
//                             <div className="row">
//                                 {/* <div className="col-sm-3 collection-filter">

//                                     <StickyBox offsetTop={20} offsetBottom={20}>
//                                         <div>
//                                             <Filter/>
//                                             <NewProduct/>
//                                             <div className="collection-sidebar-banner">
//                                                 <a href="#">
//                                                     <img src={`${process.env.PUBLIC_URL}/assets/images/side-banner.png`} className="img-fluid" alt="" />
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </StickyBox>
//                                     {/*side-bar banner end here*
//                                 </div> */}
//                                 <div className="collection-content col">
//                                     <div className="page-main-content ">
//                                         <div className="">
//                                             <div className="row">
//                                                 <div className="col-sm-12">
//                                                     <div className="top-banner-wrapper">
//                                                         <a href="#"><img src={`${process.env.PUBLIC_URL}/assets/images/mega-menu/2.jpg`} className="img-fluid" alt=""/></a>
//                                                         <div className="top-banner-content small-section">
//                                                             <h4>fashion</h4>
//                                                             <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h5>
//                                                             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="collection-product-wrapper">
//                                                         <div className="product-top-filter">
//                                                             <div className="container-fluid p-0">
//                                                                 <div className="row">
//                                                                     <div className="col-xl-12">
//                                                                         <div className="filter-main-btn">
//                                                                             <span onClick={this.openFilter}
//                                                                                 className="filter-btn btn btn-theme"><i
//                                                                                 className="fa fa-filter"
//                                                                                 aria-hidden="true"></i> Filter</span>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="row">
//                                                                     <div className="col-12">
//                                                                         <FilterBar onLayoutViewClicked={(colmuns) => this.LayoutViewClicked(colmuns)}/>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                         <Search 
//                                                         searchProductsHandler={this.searchProductsHandler}
//                                                         onSearch={this.onSearch}
//                                                         text= {this.state.text}
//                                                         products={this.state.products}
//                                                         />

//                                                         {/*Products Listing Component*/}
//                                                         <ProductListing
//                                                         products={this.state.products}
//                                                         colSize={this.state.layoutColumns}
//                                                         />

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//             </div>
//         )
//     }
// }
// const mapStateToProps = (state) => ({
//     products: getVisibleproducts(state.data, state.filters),
//     filters: state.filters,

// })

// export default connect(
//     mapStateToProps, {
//         // searchProductsHandler,
//     }
// )(ShopNow)