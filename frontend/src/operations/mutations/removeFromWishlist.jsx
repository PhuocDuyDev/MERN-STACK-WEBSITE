import { gql, useMutation } from '@apollo/client';

const REMOVE_FROM_WISHLIST_MUTATION = gql`
    mutation RemoveProductFromWishlist($productId: ID!) {
        removeProductFromWishlist(productId: $productId) {
            id
            name
            email
            role
            cart {
                itemsInfo {
                    id
                    name
                    price
                    quantity
                    discount
                    sizeProductUser
                }
            }
            wishlist {
                items {
                    productId
                }
            }
        }
    }
`;

const useAddToWishlist = () => {
    const [mutate, { loading, error, data }] = useMutation(
        REMOVE_FROM_WISHLIST_MUTATION,
        {
            onError: (err) => {
                throw err.graphQLErrors[0];
            }
        }
    );
    return { mutate, loading, error, data };
};

export default useAddToWishlist;
