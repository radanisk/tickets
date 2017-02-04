import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from 'libs/components/BaseComponent';

import Tickets from '../components/Tickets';
import * as ticketsActionCreators from '../actions/ticketsActionCreators';

function select(state) {
    // Which part of the Redux global state does our component want to receive as props?
    return { data: state.$$ticketsStore };
}

class TicketsContainer extends BaseComponent {
    render() {
        const { dispatch, data } = this.props;
        const actions = bindActionCreators(ticketsActionCreators, dispatch);
        const locationState = this.props.location.state;

        return (
            <Tickets {...{ actions, data, locationState }} />
        );
    }
}

// Don't forget to actually use connect!
export default connect(select)(TicketsContainer);
