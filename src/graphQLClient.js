import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import config from './config';

import Store from 'Store';

const networkInterface = createNetworkInterface(config.apiURL);


export default new ApolloClient({
    networkInterface: networkInterface,
    reduxRootKey: 'apollo',
    queryTransformer: addTypename,
    dataIdFromObject: (result) => {
        if (result.id && result.__typename) {
          return result.__typename + result.id;
        }
        return null;
    }
});
