import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './featureProduct';
import wishlistReducer from './featureWishlish';
import cartReducer from './featureCart';
import { fetchDemoProducts } from './featureProduct/featureProductThunk';

const rootReducer = combineReducers({
    featureProduct: productsReducer,
    featureWishlish: wishlistReducer,
    featureCart: cartReducer,
});
const store = configureStore({
    reducer: rootReducer,
});
// Fetch the demo products when the app starts
store.dispatch(fetchDemoProducts());
export default store;
