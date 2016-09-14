import { combineReducers } from 'redux';
import NetworkModel from 'SDK/Network/NetworkModel';
import * as types from 'Constants/ActionTypes';

const initialState = {
    models: {}
};

function models(state = initialState.models, action) {
    switch (action.type) {
        case types.RECEIVED_NETWORKS:
            const networks = {};
            // Create immutable records for received networks.
            action.networks.forEach((networkModelDict: Object) => {
                networks[networkModelDict.id] = new NetworkModel(networkModelDict);
            });
            return Object.assign({}, state, networks);
            break;
        default:
            return state;
    }
}

export const getNetworks = (state): Array<string> => {
    return Object.keys(state.networks.models);
}

export default combineReducers({
  models
});
