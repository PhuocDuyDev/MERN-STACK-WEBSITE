import {
    ApolloClient,
    createHttpLink,
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