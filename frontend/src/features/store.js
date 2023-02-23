import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { fetchDemoProducts } from './featureProduct';

const store = configureStore({
    reducer: {
        featureProduct: productsReducer,
    },
});

// Fetch the demo products when the app starts
store.dispatch(fetchDemoProducts());

export default store;
