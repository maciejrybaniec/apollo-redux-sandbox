import 'isomorphic-fetch';
import { Observable } from 'rxjs';

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

        return Observable.from(
            fetch(`${config.restURL}${path}`, _options)
        ).map((response) => {
            if (response.status === 401) {
                throw new Error('UNAUTHORIZED');
            }

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
