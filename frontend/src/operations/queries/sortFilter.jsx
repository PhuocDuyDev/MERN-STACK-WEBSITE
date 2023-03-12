import { gql } from '@apollo/client';

export const GET_SORT_FILTER_QUERY = gql`
    query SortFilter {
        sortFilterVar @client {
            id
            displayName
        }
    }
`;
