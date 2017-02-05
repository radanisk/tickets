import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import Layout from '../layout/Layout';
import MainLayout from '../layout/MainLayout';

import TicketsContainer from '../containers/TicketsContainer';
import TicketContainer from '../containers/TicketContainer';
import NewTicketContainer from '../containers/NewTicketContainer';
import SignInContainer from '../containers/SignInContainer';
import * as sessionsActionCreators from '../actions/sessionsActionCreators';

export default (store) => {
  function requireAuth(nextState, replace, callback) {
    const { $$sessionsStore } = store.getState();
    if (!$$sessionsStore.get('$$currentUser')) {
      store.dispatch(sessionsActionCreators.loadUser())
    }
    return callback();
  }

  return (
    <Route component={Layout}>
      <Route path="/sign_in" component={SignInContainer} />
      <Route path="/" component={MainLayout} onEnter={requireAuth}>
        <Route path="tickets/new" component={NewTicketContainer} />
        <Route path="tickets/:id" component={TicketContainer} />
        <IndexRoute component={TicketsContainer} />
      </Route>
    </Route>
  )
};
