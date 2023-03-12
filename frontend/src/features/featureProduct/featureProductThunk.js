import { demoProducts } from '../../const/demoProducts';
import {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
} from './featureProductSlice';

// Async action creator to fetch demo products
export const fetchDemoProducts = () => {
    return async (dispatch) => {
        dispatch(fetchProductsStart());
        // Simulate network request with a delay
        const fakeNetworkRequest = new Promise((resolve) => {
            setTimeout(() => {
                resolve([...demoProducts]);
            }, Math.random() * 3000);
        });

        try {
            const products = await fakeNetworkRequest;
            dispatch(fetchProductsSuccess(products));
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    };
};

// import { fetchProducts, addProduct } from './featureProductSlice';

// export const loadProducts = () => (dispatch) => {
//     dispatch(fetchProducts());
// };

// export const createProduct = (input) => (dispatch) => {
//     dispatch(addProduct(input));
// };
