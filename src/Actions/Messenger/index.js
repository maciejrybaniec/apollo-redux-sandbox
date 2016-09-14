import { initialize } from 'SDK/Messenger/MessengerAPI';
import { receivedNetworks } from 'Actions/Propagator';

export const requestedInitialize = () => {
    return (dispatch) => {
        return initialize().then((response) => {
            const networks = response.items;

            dispatch(extractMessengerContainer(networks));
        })
        .catch((error) => {

        });
    }
};

export const extractMessengerContainer = (networks) => {
    return {
        types: [
            'EXTRACT_MESSENGER_CONTAINER_START',
            'EXTRACT_MESSENGER_CONTAINER_SUCESS',
            'EXTRACT_MESSENGER_CONTAINER_ERROR'
        ],
        payload: [receivedNetworks.bind(null, networks), initalizedMessenger]
    };
}


export const initalizedMessenger = () => {
    return {
        type: 'INITIALIZED_MESSENGER'
    }
};
