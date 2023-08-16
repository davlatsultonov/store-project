import {createSlice} from "@reduxjs/toolkit";
import {fetchProduct} from "./ActionCreator.js";

const initialState = {
    product: null,
    isLoading: false,
    error: false,
    isSuccess: false
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, { payload }) => {
            state.product = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled.type, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.error = false;
            state.product = action.payload
        }).addCase(fetchProduct.pending.type, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProduct.rejected.type, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = action.payload;
        })
    }
})

export const { setProduct } = productSlice.actions

export default productSlice.reducer;