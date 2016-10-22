/* @flow */
/**
 * Endpoint communication library.
 *
 * @module API
 * @version 1.0.0
 *
 * @author Joivy
 * @copyright (c) 2016 Joivy Ltd.
 */

import Messenger from 'API/Messenger';

import Transport from 'API/Transport';


let _transport = new Transport({
    host: 'https://joivy-dev0.appspot.com'
});


export const getTransport = () => {
    return _transport;
};

export const API = {
    Messenger
};

type MessengerInitializeResponseType = {
    context: Boolean
};


API.Messenger.initialize({}, {
    timeout: 10000
}).then(() => {
    console.log('kaczka!');
}).catch(() => {
    console.log('sasa');
});
API.Messenger.initialize();
API.Messenger.initialize();
API.Messenger.initialize();
API.Messenger.initialize();
API.Messenger.initialize();
API.Messenger.initialize();
