import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "./ActionCreator.js";

const initialState = {
    categories: [],
    isLoading: false,
    error: false,
    currentCategory: ''
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCurrentCategory: (state, { payload }) => {
            state.currentCategory = payload
        }
    },
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

export const { setCurrentCategory } = categorySlice.actions

export default categorySlice.reducer;