import Immutable from 'immutable';

import * as actionTypes from '../constants/ticketsConstants';

export const $$initialState = Immutable.fromJS({
    $$tickets: null,
    errors: null,
});

export default function ticketsReducer($$state = $$initialState, action = {}) {
    const { type, tickets } = action;

    switch (type) {
        case actionTypes.FETCH_TICKETS_SUCCESS: {
            return $$state.merge({
                $$tickets: tickets,
                errors: null,
            });
        }

        case actionTypes.SUBMIT_TICKET_FAILURE: {
            return $$state.merge({
                errors: action.errors,
            });
        }

        case actionTypes.SUBMIT_TICKET_SUCCESS: {
            return $$state.merge({
                errors: null,
            });
        }

        case actionTypes.RESET_TICKETS: {
            return $$initialState;
        }

        default: {
            return $$state;
        }
    }
}
