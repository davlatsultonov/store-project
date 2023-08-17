import {configureStore} from "@reduxjs/toolkit";
import productReducer from './reducers/ProductsSlice.js'
import singleProductReducer from './reducers/ProductSlice.js'
import categoryReducer from './reducers/CategoriesSlice.js'
import basketReducer from './reducers/BasketSlice.js'
import paginationReducer from './reducers/PaginationSlice.js'

export const store = configureStore({
    reducer: {
        productReducer, categoryReducer, singleProductReducer, basketReducer, paginationReducer
    }
})