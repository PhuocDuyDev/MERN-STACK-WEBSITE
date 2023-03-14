import { gql, useMutation } from '@apollo/client';

export const LOGOUT_MUTATION = gql`
    mutation Logout($userId: ID!) {
        logout(userId: $userId) {
            message
        }
    }
`;

const useLogoutMutation = () => {
    const [mutate, { loading, error, data }] = useMutation(LOGOUT_MUTATION, {
        onError: (err) => {
            throw err.graphQLErrors[0];
        },
    });
    return { mutate, loading, error, data };
};

export default useLogoutMutation;
