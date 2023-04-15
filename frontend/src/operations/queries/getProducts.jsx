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
            size {
                items {
                    size
                    quantity
                }
            }
        }
    }
`;

const useGetProductsQuery = () => {
    const { data, error, loading, refetch } = useQuery(GET_PRODUCTS_QUERY, {
        onError: (err) => {
            throw err.graphQLErrors[0];
        },
    });
    return { data, error, loading, refetch };
};

export default useGetProductsQuery;
