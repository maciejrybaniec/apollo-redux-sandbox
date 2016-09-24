import { combineEpics } from 'redux-observable';
import Messenger from 'Epics/Messenger';

export default combineEpics(
    Messenger
);
