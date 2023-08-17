import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./ActionCreator.js";

const initialState = {
    currentPage: 1,
    postsPerPage: 10,
    totalPosts: null,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
       setCurrentPage: (state, { payload }) => {
           state.currentPage = payload
       },
       setPostsPerPage: (state, { payload }) => {
           state.postsPerPage = payload
       },
       setTotalPosts: (state, { payload }) => {
           state.totalPosts = payload
       },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled.type, (state, { payload: {
            total
        } }) => {
            state.totalPosts = total
        })
    }
})

export const { setCurrentPage, setPostsPerPage, setTotalPosts } = paginationSlice.actions;
export default paginationSlice.reducer;