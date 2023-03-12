import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS_QUERY = gql`
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
        onError: (err) => err.message,
    });
    return { data, error, loading };
};

export default useGetProductsQuery;
