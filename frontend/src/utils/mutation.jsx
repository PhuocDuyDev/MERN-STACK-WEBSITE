import { gql } from '@apollo/client';



export const REFRESHTOKEN_MUTATION = gql`
    mutation RefreshToken($tokenInput: String!) {
        refreshToken(tokenInput: $tokenInput) {
            accessToken
        }
    }
`;
