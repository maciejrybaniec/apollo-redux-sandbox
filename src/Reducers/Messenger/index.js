import { combineReducers } from 'redux';
import * as types from 'Constants/ActionTypes';

const initialState = {
    initialized: false
};

function initialized(state = initialState.initialized, action) {
    console.log(action.type, 'Dispatched');
    switch (action.type) {
        case types.INITIALIZED_MESSENGER_SUCESS:
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
