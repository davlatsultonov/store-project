import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./ActionCreator.js";
import {calculateWithDiscount, findMaxPrice, findMinPrice} from "../../helpers/helpers.js";
import {SORT_ELEMENTS} from "../../components/contants/index.js";

const initialState = {
    products: [],
    filteredProducts: [],
    brands: [],
    selectedBrand: '',
    currentCategory: '',
    isLoading: false,
    error: false,
    minProductPrice: 0,
    maxProductPrice: 0,
    sortType: 'Popular'
}

const handleProductsFilter = (state) => {
    return state.products.sort((a, b) => {
        const el1 = calculateWithDiscount(a.price, a.discountPercentage);
        const el2 = calculateWithDiscount(b.price, b.discountPercentage);
        if (state.sortType === SORT_ELEMENTS.cheap) return el1 - el2
        if (state.sortType === SORT_ELEMENTS.expensive) return el2 - el1
        return b.rating - a.rating
    }).filter(product => {
        const price = parseInt(product.price)
        const greaterThanMin = price >= state.minProductPrice;
        const lowerThanMax = price <= state.maxProductPrice;
        if (state.selectedBrand === '') return greaterThanMin && lowerThanMax
        else return greaterThanMin && lowerThanMax && product.brand === state.selectedBrand;
    }).filter(product => state.currentCategory === '' ? product : product.category === state.currentCategory)
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setBrands: (state) => {
            const filteredBrands = new Set(state.filteredProducts.map(product => product.brand))
            state.brands = Array.from(filteredBrands)
        },
        setBrand: (state, {payload}) => {
            state.selectedBrand = payload
            state.filteredProducts = handleProductsFilter(state)
        },
        setSortType: (state, {payload}) => {
            state.sortType = payload
            state.filteredProducts = handleProductsFilter(state)
        },
        setMinProductPrice: (state, {payload}) => {
            state.minProductPrice = payload
            state.filteredProducts = handleProductsFilter(state)
        },
        setMaxProductPrice: (state, {payload}) => {
            state.maxProductPrice = payload
            state.filteredProducts = handleProductsFilter(state)
        },
        setCurrentCategory: (state, { payload }) => {
            state.currentCategory = payload
            state.selectedBrand = '';
            state.filteredProducts = handleProductsFilter(state)
            state.brands = Array.from(new Set(state.filteredProducts.map(product => product.brand)))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled.type, (state, {
            payload: {
                products
            }
        }) => {
            const filteredBrands = new Set(products.map(product => product.brand));
            state.brands = Array.from(filteredBrands);
            state.selectedBrand = '';
            state.minProductPrice = findMinPrice(products);
            state.maxProductPrice = findMaxPrice(products);
            state.isLoading = false;
            state.error = false;
            state.products = products;
            state.filteredProducts = handleProductsFilter(state);
        }).addCase(fetchProducts.pending.type, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProducts.rejected.type, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const {setBrand, setCurrentCategory, setBrands, setSortType, setMaxProductPrice, setMinProductPrice} = productSlice.actions;
export default productSlice.reducer;