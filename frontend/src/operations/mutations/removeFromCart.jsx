import { gql, useMutation } from '@apollo/client';

const REMOVE_FROM_CART_MUTATION = gql`
    mutation RemoveProductFromCart($productId: ID!, $sizeProduct: String!) {
        removeProductFromCart(
            productId: $productId
            sizeProduct: $sizeProduct
        ) {
            id
            name
            email
            cart {
                itemsInfo {
                    id
                    name
                    images
                    price
                    quantity
                    discount
                    sizeProductUser
                    size {
                        items {
                            size
                            quantity
                        }
                    }
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

const useRemoveFromCartMutation = () => {
    const [mutate, { loading, error, data }] = useMutation(
        REMOVE_FROM_CART_MUTATION,
        {
            onError: (err) => {
                throw err.graphQLErrors[0];
            },
        }
    );
    return { mutate, loading, error, data };
};

export default useRemoveFromCartMutation;
