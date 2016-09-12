import { combineReducers } from 'redux'
import * as types from 'Constants/ActionTypes';

const initialState = {
    users: [],
    filter: ''
};

function models(state = initialState.users, action) {
    switch (action.type) {
        case types.ADD_USER:
            const user = state.concat([action.user]);
            return user;
            break;
        case types.RECEIVED_USERS:
            console.log('RECEIVED_USERS');
            return state;
            break;
        default:
            return state;
    }
}

function usersFilter(state = initialState.filter, action) {
    return state;
}

export default combineReducers({
  models,
  usersFilter
});
