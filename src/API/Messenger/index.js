/* @flow */
/**
 * Messenger API.
 *
 * @module API/Messenger
 * @version 1.0.0
 *
 * @author Joivy
 * @copyright (c) 2016 Joivy Ltd.
 */

 import { getTransport } from 'API';

type MessengerInitializePayloadType = {
    limit?: number
};

type FileType = {
    file: {
        extension: number
    }
};

type MessengerInitializeResponseType = {
    context: {
        files: Array<FileType>
    }
};

 /**
 * Initialize messenger module.
 * @param {MessengerInitializeType} [payload] Messenger initialize params.
 * @returns {Promise}
 */
export const initialize = (
    payload?: MessengerInitializePayloadType,
    options?: Object
): Promise<*> => {
    return getTransport().get('api/messenger/init', payload, options)
        .then((response: MessengerInitializeResponseType) => {
            return response;
        });
};

export default {
    initialize
};
