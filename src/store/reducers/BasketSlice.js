import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./ActionCreator.js";
import {findMaxPrice, findMinPrice} from "../../helpers/helpers.js";
import {useSelector} from "react-redux";

const initialState = {
    products: {},
    showBasketItems: false
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        add: (state, { payload }) => {
            if (typeof payload === 'string') {
                state.products[payload].push(state.products[payload][0]);
                return;
            }

            if (!state.products.hasOwnProperty(payload.title)) {
                state.products[payload.title] = [];
                state.products[payload.title].push(payload);
            } else {
                state.products[payload.title].push(payload)
            }
        },
        remove: (state, { payload }) => {
            if (state.products[payload].length <= 1) delete state.products[payload]
            else state.products[payload].pop()
        },
        toggleShowBasketItems: (state) => {
            state.showBasketItems = !state.showBasketItems
        }
    },
})

export const { add, remove, toggleShowBasketItems } = basketSlice.actions;
export default basketSlice.reducer;