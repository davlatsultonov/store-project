import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./ActionCreator.js";

const initialState = {
    products: [],
    isLoading: false,
    error: false,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: {
        [fetchProducts.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.products = action.payload
        },
        [fetchProducts.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [fetchProducts.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default productSlice.reducer;