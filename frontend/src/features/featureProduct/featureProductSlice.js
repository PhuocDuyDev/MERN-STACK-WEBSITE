import { createSlice } from '@reduxjs/toolkit';
import { demoProducts } from '../../const/demoProducts';

const initialState = {
    products: [...demoProducts],
    isLoading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.isLoading = true;
        },
        fetchProductsSuccess(state, action) {
            state.isLoading = false;
            state.products = action.payload;
        },
        fetchProductsFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
