import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from '../../../libs/components/BaseComponent';

import SignIn from '../components/SignIn';
import * as sessionsActionCreators from '../actions/sessionsActionCreators';

function select(state) {
    // Which part of the Redux global state does our component want to receive as props?
    return { data: state.$$sessionsStore };
}


class SignInContainer extends BaseComponent {
  render() {
    const { dispatch, data, error } = this.props;
    const actions = bindActionCreators(sessionsActionCreators, dispatch);
    const locationState = this.props.location.state;

    return (
      <SignIn {...{ actions, data, locationState }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(SignInContainer);
