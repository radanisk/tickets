import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../layout/Layout';
import MainLayout from '../layout/MainLayout';
import TicketsContainer from '../containers/TicketsContainer';

export default (
  <Route component={Layout}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={TicketsContainer} />
    </Route>
  </Route>
);
