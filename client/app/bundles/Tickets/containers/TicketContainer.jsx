import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from 'libs/components/BaseComponent';

import Ticket from '../components/Ticket';
import * as ticketsActionCreators from '../actions/ticketsActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$ticketsStore };
}

class TicketContainer extends BaseComponent {
  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(ticketsActionCreators, dispatch);
    const locationState = this.props.location.state;
    const routeParams = this.props.routeParams;

    return (
      <Ticket {...{ actions, data, locationState, routeParams }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(TicketContainer);
