import {push} from 'react-router-redux';
import * as actionTypes from '../constants/ticketsConstants';
import requestsManager from 'libs/requestsManager';

export function reset() {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.RESET_TICKETS
    });
  };
}

export function fetchSuccess(data) {
  return {
    type: actionTypes.FETCH_TICKETS_SUCCESS,
    tickets: data.tickets,
  };
}

export function fetch() {
  return (dispatch) => {
    return (
      requestsManager
        .fetchEntities()
        .then(res => dispatch(fetchSuccess(res.data)))
    );
  };
}
