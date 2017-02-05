import request from 'axios';
import ReactOnRails from 'react-on-rails';

const API_URL = '/api/v1/';

export default {

  /**
   * Retrieve list of tickets from server using AJAX call.
   *
   * @returns {Promise} - Result of ajax call.
   */
  fetchTickets() {
    return request({
      method: 'GET',
      url: API_URL + 'tickets/',
      responseType: 'json',
    });
  },

  /**
   * Retrieve ticket from server using AJAX call.
   *
   * @param {int} id
   * @returns {Promise} - Result of ajax call.
   */
  fetchTicket(id) {
    return request({
      method: 'GET',
      url: API_URL + 'tickets/' + id,
      responseType: 'json',
    });
  },

  /**
   * Submit new ticket to server using AJAX call.
   *
   * @param {Object} entity - Request body to post.
   * @returns {Promise} - Result of ajax call.
   */
  submitTicket(entity) {
    return request({
      method: 'POST',
      url: API_URL + 'tickets/',
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: entity,
    });
  },

  /**
   * Retrieve list of tickets from server using AJAX call.
   *
   * @returns {Promise} - Result of ajax call.
   */
  fetchComments(id) {
    return request({
        method: 'GET',
        url: API_URL + 'tickets/' + id + '/comments/',
        responseType: 'json',
    });
  },

  /**
   * Submit new comment to server using AJAX call.
   *
   * @param {int} ticketId
   * @param {string} content
   * @returns {Promise} - Result of ajax call.
   */
  submitComment(ticketId, content) {
    return request({
      method: 'POST',
      url: API_URL + 'tickets/' + ticketId + '/comments/',
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: {comment: {content: content}},
    });
  },

  /**
   * Update ticket status.
   *
   * @param {int} id - Request body to post.
   * @returns {Promise} - Result of ajax call.
   */
  updateTicketStatus(id, status) {
    return request({
      method: 'PATCH',
      url: API_URL + 'tickets/' + id,
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: {ticket: {status: status}},
    });
  },
};
