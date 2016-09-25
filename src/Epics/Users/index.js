import { combineEpics } from 'redux-observable';
import { Observable, ofType, mergeMap, mapTo } from 'rxjs';

import * as types from 'Constants/ActionTypes';

/**
 * Requested users epic.
 * @param {Observable<Action>} $action Observable action.
 * @param {Store} store Redux store.
 * @returns {Observable<Action>}
 */
const requestedUsers = ($action, store) => {
    return $action.ofType(types.REQUESTED_USERS)
    .mergeMap((action) => {
        return Observable.from(action.query)
            .map((response) => {
                return {
                    type: types.RECEIVED_USERS,
                    users: response.data.users
                }
            });
    });
}


export default combineEpics(
    requestedUsers
);
