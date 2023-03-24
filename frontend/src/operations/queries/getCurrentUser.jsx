import { gql, useQuery } from '@apollo/client';

const GET_CURRENT_USER_QUERY = gql`
    query CurrentUser {
        currentUser {
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
                    discount
                }
            }
        }
    }
`;
const useGetCurrentUser = () => {
    const { data, error, loading } = useQuery(GET_CURRENT_USER_QUERY, {
        onError: (err) => {
            throw err.graphQLErrors[0];
        },
    });
    return { data, error, loading };
};

export default useGetCurrentUser;
