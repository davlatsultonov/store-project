import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./ActionCreator.js";
import {calculateWithDiscount, findMaxPrice, findMinPrice} from "../../helpers/helpers.js";
import {SORT_ELEMENTS} from "../../components/contants/index.js";

const initialState = {
    products: [],
    filteredProducts: [],
    brands: [],
    selectedBrand: '',
    isLoading: false,
    error: false,
    minProductPrice: 0,
    maxProductPrice: 0,
    sortType: 'Popular'
}

const handleProductsFilter = (state) => {
    return state.products.filter(product => {
        const price = parseInt(product.price)
        if (state.selectedBrand === '') return price >= state.minProductPrice && price <= state.maxProductPrice
        else return price >= state.minProductPrice && price <= state.maxProductPrice && product.brand === state.selectedBrand
    }).sort((a, b) => {
        if (state.sortType === SORT_ELEMENTS.cheap) {
            const el1 = calculateWithDiscount(a.price, a.discountPercentage);
            const el2 = calculateWithDiscount(b.price, b.discountPercentage);
            return el1 - el2
        }
        if (state.sortType === SORT_ELEMENTS.expensive) {
            const el1 = calculateWithDiscount(a.price, a.discountPercentage);
            const el2 = calculateWithDiscount(b.price, b.discountPercentage);
            return el2 - el1
        }
        return b.rating - a.rating
    });
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setBrands: (state) => {
            const filteredBrands = new Set(state.products.map(product => product.brand))
            state.brands = Array.from(filteredBrands)
        },
        setBrand: (state, {payload}) => {
            state.selectedBrand = payload
            state.filteredProducts = handleProductsFilter(state)
        },
        setSortType: (state, {payload}) => {
            state.sortType = payload
            state.filteredProducts = handleProductsFilter(state)
        },
        setMinProductPrice: (state, {payload}) => {
            state.minProductPrice = payload
            state.filteredProducts = handleProductsFilter(state)
        },
        setMaxProductPrice: (state, {payload}) => {
            state.maxProductPrice = payload
            state.filteredProducts = handleProductsFilter(state)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled.type, (state, {
            payload: {
                products
            }
        }) => {
            const filteredBrands = new Set(products.map(product => product.brand))
            state.brands = Array.from(filteredBrands)
            state.isLoading = false;
            state.error = false;
            state.products = products;
            state.filteredProducts = handleProductsFilter(state);
            state.minProductPrice = findMinPrice(products);
            state.maxProductPrice = findMaxPrice(products);
        }).addCase(fetchProducts.pending.type, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProducts.rejected.type, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const {setBrand, setBrands, setSortType, setMaxProductPrice, setMinProductPrice} = productSlice.actions;
export default productSlice.reducer;