import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    productsPerPage: 9,
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

// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { gql } from 'graphql-tag';
// import { client } from './store';

// // Define your GraphQL queries and mutations here
// const GET_PRODUCTS = gql`
//     query {
//         products {
//             id
//             name
//             description
//             price
//         }
//     }
// `;

// const ADD_PRODUCT = gql`
//     mutation AddProduct($input: AddProductInput!) {
//         addProduct(input: $input) {
//             id
//             name
//             description
//             price
//         }
//     }
// `;

// // Define your Redux action creators using createAsyncThunk
// export const fetchProducts = createAsyncThunk(
//     'products/fetchProducts',
//     async () => {
//         const { data } = await client.query({
//             query: GET_PRODUCTS,
//         });
//         return data.products;
//     }
// );

// export const addProduct = createAsyncThunk(
//     'products/addProduct',
//     async (input) => {
//         const { data } = await client.mutate({
//             mutation: ADD_PRODUCT,
//             variables: { input },
//         });
//         return data.addProduct;
//     }
// );

// // Define your initial state
// const initialState = {
//     products: [],
//     productsPerPage: 9,
//     isLoading: false,
//     error: null,
// };

// // Define your Redux slice
// const featureProductSlice = createSlice({
//     name: 'products',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchProducts.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(fetchProducts.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.products = action.payload;
//             })
//             .addCase(fetchProducts.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(addProduct.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(addProduct.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.products.push(action.payload);
//             })
//             .addCase(addProduct.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// export default featureProductSlice;
