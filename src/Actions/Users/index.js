import apollo from 'graphQLClient';
import gql from 'graphql-tag';
import * as types from 'Constants/ActionTypes';

import apolloQuery from 'Actions/Apollo';

export const requestedUsers = () => {
    const query = apollo.query({
        query: gql`
            query UsersQuery {
                users {
                    id
                    name
                }
            }
        `
    });

    return {
        type: types.REQUESTED_USERS,
        query
    }
};
