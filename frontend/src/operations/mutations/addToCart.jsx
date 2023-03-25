import { gql, useMutation } from '@apollo/client';

const ADD_TO_CART_MUTATION = gql`
    mutation AddToCart($inputProduct: inputAddToCart!) {
        addToCart(inputProduct: $inputProduct) {
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
const useAddToCartMutation = () => {
    const [mutate, { loading, error, data }] = useMutation(
        ADD_TO_CART_MUTATION,
        {
            onError: (err) => {
                console.log(err)
                throw err.graphQLErrors[0];
            },
        }
    );
    return { mutate, data, error, loading };
};

export default useAddToCartMutation;
