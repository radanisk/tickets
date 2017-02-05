import Immutable from 'immutable';

import * as actionTypes from '../constants/ticketsConstants';

export const $$initialState = Immutable.fromJS({
  $$tickets: null,
  $$ticket: null,
  $$comments: null,
  errors: null,
});

export default function ticketsReducer($$state = $$initialState, action = {}) {
  const { type, tickets, ticket, comments, comment, errors } = action;

  switch (type) {
    case actionTypes.FETCH_TICKETS_SUCCESS: {
      return $$state.merge({
        $$tickets: tickets,
        errors: null,
      });
    }

    case actionTypes.SUBMIT_TICKET_FAILURE: {
      return $$state.merge({
        errors: errors,
      });
    }

    case actionTypes.SUBMIT_TICKET_SUCCESS: {
      return $$state.merge({
        $$ticket: ticket,
        errors: null,
      });
    }
    
    case actionTypes.FETCH_TICKET_SUCCESS: {
      return $$state.merge({
        $$ticket: ticket,
        errors: null,
      });
    }

    case actionTypes.FETCH_COMMENTS_SUCCESS: {
      return $$state.merge({
        $$comments: comments,
        errors: null,
      });
    }

    case actionTypes.SUBMIT_COMMENT_SUCCESS: {
      return $$state.merge({
        $$comments: ($$state.get("$$comments").toArray() || []).concat([comment]),
        errors: null,
      });
    }

    case actionTypes.SUBMIT_COMMENT_FAILURE: {
      return $$state.merge({
        errors: errors,
      })
    }

    case actionTypes.RESET_TICKET: {
      return $$initialState;
    }

    case actionTypes.RESET_TICKETS: {
      return $$initialState;
    }

    default: {
      return $$state;
    }
  }
}
