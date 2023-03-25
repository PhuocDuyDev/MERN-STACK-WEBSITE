import {
    ApolloClient,
    createHttpLink,
    gql,
    InMemoryCache,
    makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CategoryFilters, SortFilters } from '../models/';
import JWTManager from './../utils/jwt';

// set default sort
export const sortFilterVar = makeVar(SortFilters.DEFAULT);
// set default category
export const categoryFilterVar = makeVar(CategoryFilters.ALL);

export const productsVar = makeVar([]);
export const currentUserVar = makeVar({});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                sortFilterVar: {
                    read() {
                        return sortFilterVar();
                    },
                },
                categoryFilterVar: {
                    read() {
                        return categoryFilterVar();
                    },
                },
                productVar: {
                    read() {
                        return productsVar();
                    },
                },
                currentUserVar: {
                    read() {
                        return currentUserVar();
                    },
                },
            },
        },
    },
});

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_BACKEND_URI,
    credentials: 'include',
});

const authMiddleware = setContext((_, { headers }) => {
    const token = JWTManager.getToken();

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

export const client = new ApolloClient({
    link: authMiddleware.concat(httpLink),
    cache,
});

// get products
// client
//     .query({
//         query: gql`
//             query Products {
//                 products {
//                     id
//                     name
//                     images
//                     description
//                     price
//                     discount
//                     category
//                     inCart
//                     inWishlist
//                     feature
//                 }
//             }
//         `,
//     })
//     .then((data) => productsVar(data.data.products));

// for (let i = 1; i <= 10; i++) {
//     client
//         .mutate({
//             mutation: gql`
//                 mutation AddProduct($input: ProductInput!) {
//                     addProduct(input: $input) {
//                         message
//                         productInfo {
//                             id
//                             size {
//                                 items {
//                                     quantity
//                                     size
//                                 }
//                             }
//                         }
//                     }
//                 }
//             `,
//             variables: {
//                 input: {
//                     name: `San.D ${i}`,
//                     images: [
//                         'http://dotilo.com/image/catalog/coupon/aotron/xam.jpg',
//                         'http://dotilo.com/image/catalog/coupon/aotron/dodo.jpg',
//                         'http://bizweb.dktcdn.net/thumb/grande/100/393/497/products/teetheuxu-backblack.jpg?v=1659515295977',
//                         'https://bizweb.dktcdn.net/thumb/1024x1024/100/416/517/products/nguyen-02.png?v=1617871998747',
//                     ],
//                     size: {
//                         items: [
//                             { size: 'Small', quantity: 10 },
//                             { size: 'Medium', quantity: 20 },
//                             { size: 'Large', quantity: 30 },
//                         ],
//                     },
//                     price: 192,
//                     category: 'san.d',
//                 },
//             },
//         })
//         .then((data) => console.log(data));
// }
// for (let i = 1; i <= 10; i++) {
//     client
//         .mutate({
//             mutation: gql`
//                 mutation AddProduct($input: ProductInput!) {
//                     addProduct(input: $input) {
//                         message
//                         productInfo {
//                             id
//                             size {
//                                 items {
//                                     quantity
//                                     size
//                                 }
//                             }
//                         }
//                     }
//                 }
//             `,
//             variables: {
//                 input: {
//                     name: `T-Shirt ${i}`,
//                     images: [
//                         'http://dotilo.com/image/catalog/coupon/aotron/xam.jpg',
//                         'http://dotilo.com/image/catalog/coupon/aotron/dodo.jpg',
//                         'http://bizweb.dktcdn.net/thumb/grande/100/393/497/products/teetheuxu-backblack.jpg?v=1659515295977',
//                         'https://bizweb.dktcdn.net/thumb/1024x1024/100/416/517/products/nguyen-02.png?v=1617871998747',
//                     ],
//                     size: {
//                         items: [
//                             { size: 'Small', quantity: 10 },
//                             { size: 'Medium', quantity: 20 },
//                             { size: 'Large', quantity: 30 },
//                         ],
//                     },
//                     price: 192,
//                     category: 'tshirt',
//                 },
//             },
//         })
//         .then((data) => console.log(data));
// }
// for (let i = 1; i <= 10; i++) {
//     client
//         .mutate({
//             mutation: gql`
//                 mutation AddProduct($input: ProductInput!) {
//                     addProduct(input: $input) {
//                         message
//                         productInfo {
//                             id
//                             size {
//                                 items {
//                                     quantity
//                                     size
//                                 }
//                             }
//                         }
//                     }
//                 }
//             `,
//             variables: {
//                 input: {
//                     name: `Jean ${i}`,
//                     images: [
//                         'http://dotilo.com/image/catalog/coupon/aotron/xam.jpg',
//                         'http://dotilo.com/image/catalog/coupon/aotron/dodo.jpg',
//                         'http://bizweb.dktcdn.net/thumb/grande/100/393/497/products/teetheuxu-backblack.jpg?v=1659515295977',
//                         'https://bizweb.dktcdn.net/thumb/1024x1024/100/416/517/products/nguyen-02.png?v=1617871998747',
//                     ],
//                     size: {
//                         items: [
//                             { size: 'Small', quantity: 10 },
//                             { size: 'Medium', quantity: 20 },
//                             { size: 'Large', quantity: 30 },
//                         ],
//                     },
//                     price: 192,
//                     category: 'jean',
//                 },
//             },
//         })
//         .then((data) => console.log(data));
// }
// for (let i = 1; i <= 10; i++) {
//     client
//         .mutate({
//             mutation: gql`
//                 mutation AddProduct($input: ProductInput!) {
//                     addProduct(input: $input) {
//                         message
//                         productInfo {
//                             id
//                             size {
//                                 items {
//                                     quantity
//                                     size
//                                 }
//                             }
//                         }
//                     }
//                 }
//             `,
//             variables: {
//                 input: {
//                     name: `Dress ${i}`,
//                     images: [
//                         'http://dotilo.com/image/catalog/coupon/aotron/xam.jpg',
//                         'http://dotilo.com/image/catalog/coupon/aotron/dodo.jpg',
//                         'http://bizweb.dktcdn.net/thumb/grande/100/393/497/products/teetheuxu-backblack.jpg?v=1659515295977',
//                         'https://bizweb.dktcdn.net/thumb/1024x1024/100/416/517/products/nguyen-02.png?v=1617871998747',
//                     ],
//                     size: {
//                         items: [
//                             { size: 'Small', quantity: 10 },
//                             { size: 'Medium', quantity: 20 },
//                             { size: 'Large', quantity: 30 },
//                         ],
//                     },
//                     price: 192,
//                     category: 'dresses',
//                 },
//             },
//         })
//         .then((data) => console.log(data));
// }
// for (let i = 1; i <= 10; i++) {
//     client
//         .mutate({
//             mutation: gql`
//                 mutation AddProduct($input: ProductInput!) {
//                     addProduct(input: $input) {
//                         message
//                         productInfo {
//                             id
//                             size {
//                                 items {
//                                     quantity
//                                     size
//                                 }
//                             }
//                         }
//                     }
//                 }
//             `,
//             variables: {
//                 input: {
//                     name: `Jacket ${i}`,
//                     images: [
//                         'http://dotilo.com/image/catalog/coupon/aotron/xam.jpg',
//                         'http://dotilo.com/image/catalog/coupon/aotron/dodo.jpg',
//                         'http://bizweb.dktcdn.net/thumb/grande/100/393/497/products/teetheuxu-backblack.jpg?v=1659515295977',
//                         'https://bizweb.dktcdn.net/thumb/1024x1024/100/416/517/products/nguyen-02.png?v=1617871998747',
//                     ],
//                     size: {
//                         items: [
//                             { size: 'Small', quantity: 10 },
//                             { size: 'Medium', quantity: 20 },
//                             { size: 'Large', quantity: 30 },
//                         ],
//                     },
//                     price: 192,
//                     category: 'san.d',
//                 },
//             },
//         })
//         .then((data) => console.log(data));
// }
