import React from 'react';
import { Route } from 'react-router';

import Main from 'Components/Main';
import MessengerContainer from './Containers/MessengerContainer';

export default (
    <Route path="/" component={Main}>
        <Route path="messenger" component={MessengerContainer} />
    </Route>
);
