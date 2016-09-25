import { combineEpics } from 'redux-observable';

import Messenger from 'Epics/Messenger';
import Users from 'Epics/Users';

export default combineEpics(
    Messenger,
    Users
);
