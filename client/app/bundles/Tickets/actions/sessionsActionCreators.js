import { push } from 'react-router-redux';
import request from 'axios';

import * as actionTypes from '../constants/sessionsConstants';

export function signInFailure(error) {
  return {
    type: actionTypes.SIGN_IN_FAILURE,
    error: error,
  }
}

export function signIn(email, password) {
  return (dispatch) => {
    return (
      request({
        method: 'POST',
        url: '/api/v1/session',
        responseType: 'json',
        headers: ReactOnRails.authenticityHeaders(),
        data: {user: {email, password}},
      })
      .then(res => {
        dispatch(loadUser());
        return dispatch(push('/'));
      })
      .catch(error => {
        if (error.response.status === 422) {
          return dispatch(push('/'));
        }
        dispatch(signInFailure(error.response.data.error));
      })
    );
  }
}

export function loadUserSuccess(data) {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    user: data.user,
  }
}

export function loadUserFailure(error) {
  console.log(error);
  return (dispatch) => {
    return dispatch(push('/sign_in'));
  }
}

export function loadUser() {
  return (dispatch) => {
    return(
      request({
        method: 'GET',
        url: '/api/v1/profile',
        responseType: 'json',
        headers: ReactOnRails.authenticityHeaders(),
      })
        .then(res => dispatch(loadUserSuccess(res.data)))
        .catch(error => dispatch(loadUserFailure(error)))
    );
  }
}

export function signOutSuccess() {
  return {
    type: actionTypes.SIGN_OUT_SUCCESS,
  }
}

export function resetFull() {
  return {
    type: actionTypes.RESET_FULL,
  }
}

export function signOut() {
  return (dispatch) => {
    return(
      request({
        method: 'DELETE',
        url: '/api/v1/session',
        responseType: 'json',
        headers: ReactOnRails.authenticityHeaders(),
      })
        .then(res => {
          dispatch(signOutSuccess());
          dispatch(push('/sign_in'));
          dispatch(resetFull());
        })
        .catch(error => console.log(error))
    );
  }
}
