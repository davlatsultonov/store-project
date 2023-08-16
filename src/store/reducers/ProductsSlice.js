import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./ActionCreator.js";

const initialState = {
    products: [],
    filteredProducts: [],
    brands: [],
    selectedBrand: '',
    isLoading: false,
    error: false,
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled.type, (state, { payload }) => {
            const filteredBrands = new Set(payload.map(product => product.brand))
            state.brands = Array.from(filteredBrands)
            state.selectedBrand = '';
            state.isLoading = false;
            state.error = false;
            state.products = payload
            state.filteredProducts = payload.filter(product => {
                if (state.selectedBrand === '') return product
                return product.brand === state.selectedBrand
            })
        }).addCase(fetchProducts.pending.type, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProducts.rejected.type, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const { setBrand, setBrands } = productSlice.actions;
export default productSlice.reducer;