import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

const createAsyncThunkWrapper = (type, callback) => {
    return createAsyncThunk(type,
        async (arg , thunkAPI) => {
            try {
                return await callback(arg, thunkAPI.getState())
            } catch (err) {
                return thunkAPI.rejectWithValue(err.message)
            }
        })
}

export const fetchProducts = createAsyncThunkWrapper('product/fetchAll', async () => {
    const { data } = await axios.get('https://dummyjson.com/products?limit=0')
    return data
})

export const fetchProduct = createAsyncThunkWrapper('product/fetchProduct', async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`)
    return response.data
})

export const fetchCategories = createAsyncThunkWrapper('product/fetchAllCategories',
    async () => {
        const response = await axios.get('https://dummyjson.com/products/categories')
        return response.data
    })
