import { gql, useMutation } from '@apollo/client';

const ADD_TO_CART_MUTATION = gql`
    mutation AddToCart($productId: ID!, $quantity: Int!) {
        addToCart(productId: $productId, quantity: $quantity) {
            id
            name
            email
            cart {
                itemsInfo {
                    name
                    images
                    price
                    quantity
                    discount
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
            }
        }
    );
    return { mutate, data, error, loading };
};

export default useAddToCartMutation;
