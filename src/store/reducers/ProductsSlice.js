import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./ActionCreator.js";
import {store} from "../store.js";

const initialState = {
    products: [],
    isLoading: false,
    error: false,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled.type, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.products = action.payload
        }).addCase(fetchProducts.pending.type, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProducts.rejected.type, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default productSlice.reducer;