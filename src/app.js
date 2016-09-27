import { ApolloProvider } from 'react-apollo'
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import store from 'Store';
import graphQLClient from './graphQLClient';

import routes from './router';

import NetworkModel from 'SDK/Network/NetworkModel';

if (module.hot) {
  module.hot.accept();
}

render((
  <ApolloProvider client={graphQLClient} store={store}>
     <Router history={browserHistory}>
        {routes}
     </Router>
  </ApolloProvider>
), document.getElementById('root'));
