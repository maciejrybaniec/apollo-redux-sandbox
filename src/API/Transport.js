/* @flow */
/**
 * API
 *
 * @module SDK/Transport
 * @version 1.0.0
 *
 * @copyright (c) 2016 Joivy Ltd.
 */

import EventEmitter from 'eventemitter3';

import RequestManager from 'API/RequestManager';

type TransportConfig = {
    timeout?: number,
    headers?: Object,
    host?: string,
};

const DEFAULT_TIMEOUT = 10000;
const METHODS = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

class Transport extends EventEmitter {
    static NO_NETWORK: string = 'NO_NETWORK';
    static SUCCESS: string = 'SUCCESS';
    static CONTEXT: string = 'RECEIVED_CONTEXT';
    static TIMEOUT: string = 'TIMEOUT';
    static UNAUTHORIZED: string = 'UNAUTHORIZED';
    /**
     * Global request timeout.
     * @property {number} _timeout Request timeout.
     * @private
     */
    _timeout: number;
    /**
     * Request custom headers.
     * @property {Object} _headers Request custom headers.
     * @private
     */
    _headers: Object;
    /**
     * Request host reference.
     * @property {string} _host Host reference.
     * @private
     */
    _host: string;
    /**
     * Transport class constructor.
     * @param {TransportConfig} config Transport configuration.
     * @constructor
     */
    constructor(config: TransportConfig = {}) {
        super();
        this._headers = config.headers || {};
        this._timeout = config.timeout || DEFAULT_TIMEOUT;
        this._host = config.host || '';
    }
    /**
     * Make POST request to API.
     * @param {string} path Request URL
     * @param {Object} [body] Request body.
     * @param {Object} [options] Request options.
     * @returns {Promise}
     */
    create(path: string, body?: Object, options: Object = {}) {
        return this._send(METHODS.POST, path, body, options);
    }
    /**
     * Make GET request to API.
     * @param {string} path Request URL
     * @param {Object} [body] Request body.
     * @param {Object} [options] Request options.
     * @returns {Promise}
     */
    get(path: string, body?: Object, options: Object = {}) {
        return this._send(METHODS.GET, path, body, options);
    }
    /**
     * Make GET request to API.
     * @param {string} method Request method.
     * @param {string} path Request URL
     * @param {Object} [body] Request body.
     * @param {Object} [options] Request options.
     * @private
     * @returns {Promise}
     */
    _send(method: string, path: string, body?: Object = {}, options: Object = {}) {
        const _options = {
            headers: {
                'Content-type': 'application/json',
                ...this._headers,
                ...options.headers
            },
            method: method,
            body: body,
            mode: 'cors',
            credentials: 'include'
        };

        return RequestManager(this._createUrl(path), _options, options.timeout || this._timeout)
            .then((response) => {
                const timestamp = response.headers.get('X-Joivy-Timestamp');

                if (response.status < 200 || response.status >= 300) {
                     if (response.status === 401) {
                         this.emit(Transport.UNAUTHORIZED);
                     }

                     return Promise.reject({
                         status: response.status,
                         statusText: response.statusText,
                         timestamp
                     });
                 }

                 this.emit(Transport.SUCCESS);

                 return response.json().then((body: Object): Object => {
                     if (body.context && Object.keys(body.context)) {
                         this.emit(Transport.RECEIVED_CONTEXT, body.context);
                     }

                     return {
                         ...body,
                         timestamp
                     };
                 });
            }).catch((error: Error) => {
                if (error && error.message === 'Fetch timeout') {
                    this.emit(Transport.TIMEOUT);
                } else {
                    this.emit(Transport.NO_NETWORK);
                }
                throw error;
            });
    }
    /**
     * Create endpoint URL.
     * @param {string} path Path to resource.
     * @returns {string}
     * @private
     */
    _createUrl(path: string): string {
        let url = path.indexOf('/') === 0 ? path : `/${path}`;
        return `${this._host}${url}`;
    }
}

export default Transport;
