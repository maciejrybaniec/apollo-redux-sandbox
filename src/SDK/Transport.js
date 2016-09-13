import 'isomorphic-fetch';

import config from '../config';

class Transport {
    get(path: string, body?: Object, options: Object = {}) {
        return this._executeRequest('get', path, body, options);
    }

    _executeRequest(method: string, path: string, body?: Object, options?: Object) {
        const _options = {
            headers: {
                ...options.headers
            },
            method: method.toUpperCase(),
            credentials: 'include',
            mode: 'cors'
        };

        return fetch(`${config.restURL}${path}`, _options).then((response) => {
            return response.json();
        });
    }
}

let _requestHandler = new Transport();

export const setTransport = (requestHandler: Transport) => {
    _requestHandler = requestHandler;
}

export const getTransport = () => {
    return _requestHandler;
}

export default Transport;
