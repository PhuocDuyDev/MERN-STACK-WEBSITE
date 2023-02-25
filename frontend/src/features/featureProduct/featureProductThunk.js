import { demoProducts } from '../../const/demoProducts';
import {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
} from './featureProductSlice';

// Async action creator to fetch demo products
export const fetchDemoProducts = (category) => {
    return async (dispatch) => {
        dispatch(fetchProductsStart());

        // Simulate network request with a delay
        const fakeNetworkRequest = new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    ...demoProducts.filter((product) => {
                        if (category === 'all') {
                            return product;
                        } else if (category === 'sale') {
                            return product.discount > 0;
                        }
                        return product.category === category;
                    }),
                ]);
            }, Math.random() * 800);
        });

        try {
            const products = await fakeNetworkRequest;
            dispatch(fetchProductsSuccess(products));
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    };
};
