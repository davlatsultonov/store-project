import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('product/fetchAll',
    async (category, thunkAPI) => {
        try {
            let fetchUrl = 'https://dummyjson.com/products';

            if (category) {
                fetchUrl += category === 'all' ? '' : `/category/${category}`
            }

            const response = await axios.get(fetchUrl)
            return response.data.products
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }

    })

export const fetchCategories = createAsyncThunk('product/fetchAllCategories',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://dummyjson.com/products/categories')
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }

    })
