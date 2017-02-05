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

export function resetTicket() {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.RESET_TICKET,
    })
  }
}

export function fetchSuccess(data) {
  return {
    type: actionTypes.FETCH_TICKETS_SUCCESS,
    tickets: data.tickets,
  };
}

export function fetch() {
  return (dispatch) => {
    return requestsManager
      .fetchTickets()
      .then(res => dispatch(fetchSuccess(res.data)));
  };
}

export function createTicketSuccess(data) {
  return {
    type: actionTypes.SUBMIT_TICKET_SUCCESS,
    ticket: data.ticket,
  }
}

export function createTicketFailure(errors) {
  return {
    type: actionTypes.SUBMIT_TICKET_FAILURE,
    errors: errors,
  }
}

export function createTicket(title, description) {
  return (dispatch) => {
    return requestsManager
      .submitTicket({ticket: {title: title, comment: description}})
      .then(res => {
        dispatch(createTicketSuccess(res.data));
        return dispatch(push("/tickets/" + res.data.ticket.id));
      })
      .catch(error => {
        if (!error.response) {
          throw error;
        }
        dispatch(createTicketFailure(error.response.data.errors));
      })
  }
}

export function fetchTicketSuccess(data) {
  return {
    type: actionTypes.FETCH_TICKET_SUCCESS,
    ticket: data.ticket
  }
}

export function fetchTicket(id) {
  return (dispatch) => {
    return requestsManager
      .fetchTicket(id)
      .then(res => dispatch(fetchTicketSuccess(res.data)));
  };
}

export function fetchCommentsSuccess(data) {
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    comments: data.comments
  }
}

export function fetchComments(id) {
  return (dispatch) => {
    return requestsManager
      .fetchComments(id)
      .then(res => dispatch(fetchCommentsSuccess(res.data)));
  };
}

export function submitCommentSuccess(data) {
  return {
    type: actionTypes.SUBMIT_COMMENT_SUCCESS,
    comment: data.comment,
  }
}

export function submitCommentFailure(errors) {
  return {
    type: actionTypes.SUBMIT_COMMENT_FAILURE,
    errors: errors,
  }
}

export function submitComment(ticketId, content) {
  return (dispatch) => {
    return requestsManager
      .submitComment(ticketId, content)
      .then(res => dispatch(submitCommentSuccess(res.data)))
      .catch(error => dispatch(submitCommentFailure(error.response.data.errors)))
  }
}

export function closeTicket(id) {
  return (dispatch) => {
    return requestsManager
      .updateTicketStatus(id, 'close')
      .then(res => dispatch(fetchTicketSuccess(res.data)));
  }
}
