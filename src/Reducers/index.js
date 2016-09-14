
import { combineReducers } from 'redux'

import messenger from 'Reducers/Messenger';
import networks from 'Reducers/Networks';
import users from 'Reducers/Users';

export default {
    messenger,
    networks,
    users
};
