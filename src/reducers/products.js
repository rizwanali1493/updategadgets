import {
    FETCH_SINGLE_PRODUCT,
    CHANGE_CURRENCY,
    RECEIVE_PRODUCTS } from "../constants/ActionTypes";


const initialState = {
    products: [],
    symbol: 'PKR:',
    product_details: [],
    companyNames: [],
    getProductModal:[],
    getDeviceName: "",
    getDeviceIssues: [],
    deviceTypes: [],
    companiesNames: [],
    postedDeviceTypes: [],
    postedCompanyNames_Modal: [],
    postedCompanyNames_Name: "",
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return { ...state,
                products: action.products };
        case FETCH_SINGLE_PRODUCT:
            if (state.products.findIndex(product => product.id === action.productId) !== -1) {
                const singleItem = state.products.reduce((itemAcc, product) => {
                    return product
                }, [])
                return { ...state,
                    product_details: singleItem };
            }

        case CHANGE_CURRENCY:
            return { ...state,
                symbol: action.symbol };
        case "POST_DEVICE_TYPES":
            return{
                ...state,
                postedDeviceTypes: action.payload || [],
            }
        case "POST_COMPANY_NAMES_MODAL":
            return{
                ...state,
                postedCompanyNames_Modal: action.payload.modals || [],
                postedCompanyNames_Name: action.payload.name || [],
            }
        case "GET_DEVICE_TYPES":
            return{
                ...state,
                deviceTypes: action.payload || [],
            }            
        case "POST_PRODUCT_MODAL":
            return{
                ...state,
                getProductModal: action.payload,
            }    
        case "GET_DEVICE_ISSUES":
        return{
            ...state,
            getDeviceIssues: action.payload,
        }          
        case "POST_DEVICE_ISSUES":
            return{
                ...state,
                getDeviceName: action.payload,
            }      
        case "GET_VISIBLE_PRO":
            // let m =  state.postedCompanyNames_Modal.filter(product => {
 
                // let brandMatch;
                // if(product.tags)
                //     brandMatch = product.tags.some(tag => action.filters.brand.includes(tag))
                // else
                //     brandMatch = true;
        
                // let colorMatch;
                // if(action.filterscolor && product.colors) {
                //     colorMatch = product.colors.includes(action.filterscolor)
                // }else{
                //     colorMatch = true;
                // }
        
                // const startPriceMatch = typeof action.filters.value.min !== 'number' || action.filters.value.min <= product.price;
                // const endPriceMatch = typeof action.filters.value.max !== 'number' || product.price <= action.filters.value.max;
        
                // return brandMatch && colorMatch && startPriceMatch && endPriceMatch;
            // })
            let postedCompanyNames_Modal =  action.payload.sort((product1, product2) => {
                if (action.filters.sortBy === 'HighToLow') {
                    return product2.price < product1.price ? -1 : 1;
                } else if (action.filters.sortBy === 'LowToHigh') {
                    return product2.price > product1.price ? -1 : 1;
                } else if (action.filters.sortBy === 'Newest') {
                    return product2.id < product1.id ? -1 : 1;
                } else if (action.filters.sortBy === 'AscOrder') {
                    return product1.name.localeCompare(product2.name);
                } else if (action.filters.sortBy === 'DescOrder') {
                    return product2.name.localeCompare(product1.name);
                } else {
                    return product2.id > product1.id ? -1 : 1;
                }
            })    
            return{
                ...state,
                postedCompanyNames_Modal           
            }        
        default:
            return state;
    }
};
export default productReducer;