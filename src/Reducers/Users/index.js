import { combineReducers } from 'redux';
import * as types from 'Constants/ActionTypes';

const initialState = {
    models: {};
};

function models(state = initialState.models, action) {
    switch (action.type) {
        case types.RECEIVED_USERS:
            // TODO: Map to immutable records
            return action.users;
            break;
        default:
            return state;
    }
}

export default combineReducers({
  models
});
