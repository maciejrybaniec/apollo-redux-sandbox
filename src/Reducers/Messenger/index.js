import { combineReducers } from 'redux';
import * as types from 'Constants/ActionTypes';

const initialState = {
    initialized: false
};

function initialized(state = initialState.initialized, action) {
    switch (action.type) {
        case types.INITIALIZED_MESSENGER:
            return true;
            break;
        default:
            return state;
    }
}

export const getMessengerState = (state): boolean => {
    return state.messenger.initialized;
}

export default combineReducers({
  initialized
});
