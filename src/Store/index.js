import {
    applyMiddleware,
    createStore,
    combineReducers
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import combineActions from 'redux-combine-actions';
import thunk from 'redux-thunk';

import EpicRoot from 'Epics';

import graphQLClient from '../graphQLClient';
import rootReducer from 'Reducers';

import NetworkModel from 'SDK/Network/NetworkModel';

const epicMiddleware = createEpicMiddleware(EpicRoot);

const configureStore = () => {
    return createStore(
        combineReducers({
            apollo: graphQLClient.reducer(),
            ...rootReducer
        }),
        applyMiddleware(
            graphQLClient.middleware(),
            thunk,
            epicMiddleware
        )
    );
};

export default configureStore();
