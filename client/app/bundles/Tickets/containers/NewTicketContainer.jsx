import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from 'libs/components/BaseComponent';

import TicketForm from '../components/TicketForm';
import * as ticketsActionCreators from '../actions/ticketsActionCreators';

function select(state) {
    // Which part of the Redux global state does our component want to receive as props?
    return { data: state.$$ticketsStore };
}

class NewTicketContainer extends BaseComponent {
    render() {
        const { dispatch, data } = this.props;
        const actions = bindActionCreators(ticketsActionCreators, dispatch);
        const locationState = this.props.location.state;

        return (
            <TicketForm {...{ actions, data, locationState }} />
        );
    }
}

// Don't forget to actually use connect!
export default connect(select)(NewTicketContainer);
