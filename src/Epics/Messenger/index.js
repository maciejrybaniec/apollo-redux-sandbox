import { combineEpics } from 'redux-observable';
import { Observable, ofType, mergeMap, mapTo } from 'rxjs';

import { initialize } from 'SDK/Messenger/MessengerAPI';
import * as types from 'Constants/ActionTypes';

/**
 * Initialize messenger action epic.
 * @param {Observable<Action>} $action Observable action.
 * @param {Store} store Redux store.
 * @returns {Observable<Action>}
 */
const initializeMessenger = ($action, store) => {
    return $action.ofType(types.REQUESTED_INITIALIZE_MESSENGER)
        .mergeMap((action) => {
            return initialize()
            .map((response) => {
                return { type: types.INITIALIZED_MESSENGER_SUCESS}
            })
            .catch((err) => {
                return Observable.of({
                    type: types.INITIALIZED_MESSENGER_FAILED
                });
            })
        });
}

/**
 * Initialize messenger success action epic.
 * @param {Observable<Action>} $action Observable action.
 * @param {Store} store Redux store.
 * @returns {Observable<Action>}
 */
const initializeMessengerSucess = ($action, store) => {
    return $action.ofType(types.INITIALIZED_MESSENGER_SUCESS));
}

export default combineEpics(
    initializeMessenger
);
