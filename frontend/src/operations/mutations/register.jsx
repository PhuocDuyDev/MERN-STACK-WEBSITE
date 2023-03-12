import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
    mutation MUTATION($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            message
        }
    }
`;
const useRegisterMutation = () => {
    const [mutate, { loading, error, data }] = useMutation(REGISTER_MUTATION, {
        onError: (error) => error.message,
    });
    return { mutate, data, error, loading };
};

export default useRegisterMutation;
