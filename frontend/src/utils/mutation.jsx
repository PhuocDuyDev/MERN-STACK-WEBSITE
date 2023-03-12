import { gql } from '@apollo/client';

export const CURRENTUSER_QUERY = gql`
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
                items {
                    productId
                    quantity
                }
            }
        }
    }
`;

export const REFRESHTOKEN_MUTATION = gql`
    mutation RefreshToken($tokenInput: String!) {
        refreshToken(tokenInput: $tokenInput) {
            accessToken
        }
    }
`;
