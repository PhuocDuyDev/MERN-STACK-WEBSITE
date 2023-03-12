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
            },
        },
    },
});

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
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

// for (let i = 1; i <= 10; i++) {
//     client.mutate({
//         mutation: gql`
//             mutation AddProduct(
//                 $name: String!
//                 $images: [String!]!
//                 $price: Float!
//                 $category: String!
//                 $size: [SizeTypeInput!]!
//             ) {
//                 addProduct(
//                     name: $name
//                     images: $images
//                     price: $price
//                     category: $category
//                     size: $size
//                 ) {
//                     message
//                 }
//             }
//         `,
//         variables: {
//             name: `San.D ${i}`,
//             images: [
//                 'http://dotilo.com/image/catalog/coupon/aotron/xam.jpg',
//                 'http://dotilo.com/image/catalog/coupon/aotron/dodo.jpg',
//                 'https://product.hstatic.net/1000042622/product/at483_1_35885c86017b49deb84fc47eab6d1b07_master.jpg',
//                 'https://bizweb.dktcdn.net/thumb/1024x1024/100/416/517/products/nguyen-02.png?v=1617871998747',
//             ],
//             size: [
//                 {
//                     size: 'S',
//                     quantity: 200,
//                 },
//                 {
//                     size: 'M',
//                     quantity: 100,
//                 },
//                 {
//                     size: 'L',
//                     quantity: 100,
//                 },
//             ],
//             price: 192,
//             category: 'san.d',
//         },
//     }).then(data => console.log(data));
// }
