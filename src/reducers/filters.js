import * as types from '../constants/ActionTypes'


const filtersReducerDefaultState = {
    brand: ["nike", "caprese", "lifestyle"],
    value: { min: 250, max: 950 },
    sortBy: "",
    searchProducts:""
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    // console.log('Action Result');
    // console.log(action);
    switch (action.type) {
        case types.FILTER_BRAND:
            return {
                ...state,
                brand: action.brand
            };
        case types.FILTER_COLOR:
            return {
                ...state,
                color: action.color
            };
        case types.FILTER_PRICE:
            return {
                ...state,
                value: {min: action.value.value.min, max: action.value.value.max }
            };
        case types.SORT_BY:
            return {
                ...state,
                sortBy: action.sort_by
            };
        case "SEARCH_BY":
            return{
                ...state,
                searchBy: action.search_by
            }    
        case "SEARCH_HANDLER":
            return{
                ...state,
                searchProducts: action.payload
            }
        default:
            return state;
    }
}

export default filtersReducer;