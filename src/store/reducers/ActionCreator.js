import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

const createAsyncThunkWrapper = (type, callback) => {
    return createAsyncThunk(type,
        async (arg , thunkAPI) => {
            try {
                return await callback(arg)
            } catch (err) {
                return thunkAPI.rejectWithValue(err.message)
            }
        })
}

export const fetchProducts = createAsyncThunkWrapper('product/fetchAll', async (category) => {
    const baseUrl = 'https://dummyjson.com/products';
    const finalUrl = !category || category === 'all' ? `${baseUrl}?limit=100` : `${baseUrl}/category/${category}?limit=100`;
    const response = await axios.get(finalUrl)
    return response.data.products
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
