import { gql, useQuery } from '@apollo/client';

const GET_PRODUCT_ID_QUERY = gql`
    query Query($productId: ID!) {
        product(id: $productId) {
            id
            name
            images
            category
            description
            price
            discount
            size {
                items {
                    size
                    quantity
                }
            }
            inCart
            inWishlist
        }
    }
`;

const useGetProductById = (productId) => {
    const { data, loading, error } = useQuery(GET_PRODUCT_ID_QUERY, {
        onError: (error) => {
            return error.graphQLErrors[0];
        },
        variables: {
            productId,
        },
    });

    return { data, loading, error };
};

export default useGetProductById;
