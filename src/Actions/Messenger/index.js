import { initialize } from 'SDK/Messenger/MessengerAPI';
import { receivedNetworks } from 'Actions/Propagator';
import * as types from 'Constants/ActionTypes';

export const requestedInitialize = () => {
    return {
        type: types.REQUESTED_INITIALIZE_MESSENGER
    };
};
