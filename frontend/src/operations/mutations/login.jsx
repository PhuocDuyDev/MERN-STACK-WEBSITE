import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
    mutation MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            authPayload {
                user {
                    id
                    name
                    email
                    role
                    wishlist {
                        items {
                            productId
                        }
                    }
                    cart {
                        itemsInfo {
                            id
                            name
                            price
                            quantity
                            discount
                        }
                    }
                }
                accessToken
            }
            message
        }
    }
`;

const useLoginMutation = () => {
    const [mutate, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
        onError: (error) => error.message,
    });

    return { mutate, data, error, loading };
};

export default useLoginMutation;
