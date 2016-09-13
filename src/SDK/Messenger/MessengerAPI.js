import { getTransport } from 'SDK/Transport';

export const initialize = () => {
    return getTransport().get('api/messenger/init');
}
