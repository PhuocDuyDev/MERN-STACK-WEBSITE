import { gql } from '@apollo/client';

export const GET_CATEGORY_FILTER_QUERY = gql`
    query CategoryFilter {
        categoryFilterVar @client
    }
`;
