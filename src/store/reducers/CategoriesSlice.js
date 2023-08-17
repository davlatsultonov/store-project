import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "./ActionCreator.js";

const initialState = {
    categories: [],
    isLoading: false,
    error: false,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled.type, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.categories = action.payload
        }).addCase(fetchCategories.pending.type, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchCategories.rejected.type, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default categorySlice.reducer;