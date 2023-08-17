import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./ActionCreator.js";
import {findMaxPrice, findMinPrice, sortProducts} from "../../helpers/helpers.js";

const initialState = {
    products: [],
    filteredProducts: [],
    brands: [],
    selectedBrand: '',
    isLoading: false,
    error: false,
    minProductPrice: 0,
    maxProductPrice: 0,
    sortType: 'Popular'
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setBrands: (state) => {
            state.filteredProducts = state.products.filter(product => {
                if (state.selectedBrand === '') return product
                return product.brand === state.selectedBrand
            })
        },
        setBrand: (state, { payload }) => {
            state.selectedBrand = payload
        },
        setSortType: (state, { payload }) => {
            state.sortType = payload
        },
        setMinProductPrice: (state, { payload }) => {
            state.minProductPrice = payload
        },
        setMaxProductPrice: (state, { payload }) => {
            state.maxProductPrice = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled.type, (state, { payload: {
            products
        } }) => {
            const filteredBrands = new Set(products.map(product => product.brand))
            state.brands = Array.from(filteredBrands)
            state.isLoading = false;
            state.error = false;
            state.products = products;
            state.filteredProducts = sortProducts(state.selectedBrand ? products.filter(product => product.brand === state.selectedBrand) : products, state.sortType);
            state.minProductPrice = findMinPrice(products);
            state.maxProductPrice = findMaxPrice(products);
        }).addCase(fetchProducts.pending.type, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProducts.rejected.type, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const { setBrand, setBrands, setSortType , setMaxProductPrice, setMinProductPrice} = productSlice.actions;
export default productSlice.reducer;