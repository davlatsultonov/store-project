import {configureStore} from "@reduxjs/toolkit";
import productReducer from './reducers/ProductsSlice.js'
import singleProductReducer from './reducers/ProductSlice.js'
import categoryReducer from './reducers/CategoriesSlice.js'

export const store = configureStore({
    reducer: {
        productReducer, categoryReducer, singleProductReducer
    }
})