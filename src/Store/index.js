import {
    applyMiddleware,
    createStore,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';

import graphQLClient from '../graphQLClient';
import rootReducer from 'Reducers';

console.log(rootReducer, 'LALALAL');

const configureStore = () => {
    return createStore(
        combineReducers({
            apollo: graphQLClient.reducer(),
            ...rootReducer
        }),
        applyMiddleware(
            graphQLClient.middleware(),
            thunk
        )
    );
};

export default configureStore();
