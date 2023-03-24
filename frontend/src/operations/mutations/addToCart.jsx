import { gql, useMutation } from '@apollo/client';

const ADD_TO_CART_MUTATION = gql`
    mutation AddToCart($productId: ID!, $quantity: Int!, $size: String!) {
        addToCart(productId: $productId, quantity: $quantity, size: $size) {
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
const useAddToCartMutation = () => {
    const [mutate, { loading, error, data }] = useMutation(
        ADD_TO_CART_MUTATION,
        {
            onError: (err) => {
                throw err.graphQLErrors[0];
            },
        }
    );
    return { mutate, data, error, loading };
};

export default useAddToCartMutation;
