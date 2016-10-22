/* @flow */
/**
 * API
 *
 * @module SDK/RequestManager
 * @version 1.0.0
 *
 * @copyright (c) 2016 Joivy Ltd.
 */

import 'isomorphic-fetch';

type RequestType = {
    url: string,
    options: Object,
    timeout: number,
    resolve: Function,
    reject: Function
};

const MAX_CONCURRENT_REQUESTS = 4;

const _requestsQue = [];
let _requestCount = 0;

/**
 * Responsible for pushing requests to que.
 * @param {string} url Request resource address.
 * @param {Object} options Request options.
 * @param {number} timeout Timeout.
 */
const RequestManager = (url: string, options: Object = {}, timeout: number): Promise<*> => {
    const request = { url, options, timeout };

    const promise = new Promise((resolve, reject) => {
        request.resolve = resolve;
        request.reject = reject;
    });

    _addRequestToQue(request);
    _checkQueue();
    return promise;
}

/**
 * Increase request counter.
 * @private
 */
const _startRequest = () => _requestCount += 1;

/**
 * Decrease request counter and check queue.
 * @private
 */
const _endRequest = () => {
    _requestCount -= 1;
    _checkQueue();
};

/**
 * Decrease request counter and check queue.
 * @param {RequestType} request Request added to que.
 * @private
 */
const _addRequestToQue = (request: RequestType) => {
    _requestsQue.push(request);
}

/**
 * Check queue for empty request slots.
 * @private
 */
const _checkQueue = () => {
    if (_requestCount >= MAX_CONCURRENT_REQUESTS) return;
    if (!_requestsQue.length) return
    _startRequest();
    _executeRequest(_requestsQue.shift());
};

/**
 * Execute provided request.
 * @param {Object} Request object.
 * @private
 */
const _executeRequest = ({ url, options, resolve, reject, timeout }) => {
    const timeoutId = setTimeout(() => {
        reject(new Error('Fetch timeout'));
    }, timeout);

    fetch(url, options).then((response: Response) => {
        clearTimeout(timeoutId);
        _endRequest();
        resolve(response);
    }).catch((response: Response) => {
        clearTimeout(timeoutId);
        _endRequest();
        reject(response);
    });
}

export default RequestManager;
