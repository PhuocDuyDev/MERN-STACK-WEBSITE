import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer, { fetchDemoProducts } from './featureProduct';
import wishlistReducer from './featureWishlish';
import cartReducer from './featureCart';

const rootReducer = combineReducers({
    featureProduct: productsReducer,
    featureWishlish: wishlistReducer,
    featureCart: cartReducer,
});
const store = configureStore({
    reducer: rootReducer,
});

const selectProducts = (state) => state.featureProduct.products;
// Fetch the demo products when the app starts
store.dispatch(fetchDemoProducts());

export default store;
