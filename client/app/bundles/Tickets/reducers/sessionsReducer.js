import Immutable from 'immutable';

import * as actionTypes from '../constants/sessionsConstants';

export const $$initialState = Immutable.fromJS({
  $$currentUser: null,
  error: null,
});

export default function sessionsReducer($$state = $$initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case actionTypes.SIGN_IN_SUCCESS: {
      return $$state.merge({
        $$currentUser: action.user,
        error: null,
      });
    }

    case actionTypes.SIGN_OUT_SUCCESS: {
      return $$initialState;
    }

    case actionTypes.SIGN_IN_FAILURE: {
      return $$state.merge({
        error: action.error,
      });
    }

    default: {
      return $$state;
    }
  }
}
