import { initialize } from 'SDK/Messenger/MessengerAPI';
import { receivedUsers } from 'Actions/Propagator';

export const requestedInitialize = () => {
    return (dispatch) => {
        return initialize().then((response) => {
            const users = response.context.users;

            dispatch(extractMessengerContainer(users));
        })
        .catch((error) => {

        });
    }
};

export const extractMessengerContainer = (users) => {
    return {
        types: [
            'EXTRACT_MESSENGER_CONTAINER_START',
            'EXTRACT_MESSENGER_CONTAINER_SUCESS',
            'EXTRACT_MESSENGER_CONTAINER_ERROR'
        ],
        payload: [receivedUsers.bind(null, users), initalizedMessenger]
    };
}


export const initalizedMessenger = () => {
    return {
        type: 'INITIALIZED_MESSENGER'
    }
};
