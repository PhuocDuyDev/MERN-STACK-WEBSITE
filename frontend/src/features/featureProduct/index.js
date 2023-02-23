import productsReducer from './featureProductSlice';
import { fetchDemoProducts } from './featureProductThunk';
import { selectProductsByCategory } from './selectFeatureProduct';

export { fetchDemoProducts, selectProductsByCategory };

export default productsReducer;
