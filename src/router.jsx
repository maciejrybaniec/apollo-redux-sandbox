import React from 'react';
import { Route } from 'react-router';

import Main from 'Components/Main';
import Users from './Containers/UsersContainer';

export default (
    <Route path="/" component={Main}>
        <Route path="users" component={Users} />
    </Route>
);
