import { gql, useQuery } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
    query Products {
        products {
            id
            name
            images
            description
            price
            discount
            category
            inCart
            inWishlist
            feature
        }
    }
`;

const useGetProductsQuery = () => {
    const { data, error, loading } = useQuery(GET_PRODUCTS_QUERY, {
        onError: (err) => {
            throw err.graphQLErrors[0];
        },
        fetchPolicy: 'no-cache',
    });
    return { data, error, loading };
};

export default useGetProductsQuery;
