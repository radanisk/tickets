import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../layout/Layout';
import TicketsContainer from '../containers/TicketsContainer';

export default (
    <Route path="/" component={Layout}>
        <IndexRoute
            component={TicketsContainer}
        />
    </Route>
);
