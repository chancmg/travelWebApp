import $ from 'jquery';
import { browserHistory } from 'react-router';
import * as types from './types';
// import momentTimeZone from 'moment-timezone';
import Auth from '../modules/auth';
// const TIME_ZONE = 'Asia/Kolkata';
// const getTime = function() {
//     const time = momentTimeZone();
//     time.tz(TIME_ZONE);
//     return time;
// };

export function loginOnChange(value, key) {
  return {
    type: types.LOGIN_ON_CHANGE,
    key,
    value,
  };
}

export function setLoginPending(isLoginPending) {
  return {
    type: types.SET_LOGIN_PENDING,
    isLoginPending,
  };
}

export function setLoginSuccess(loginSuccess) {
  return {
    type: types.SET_LOGIN_SUCCESS,
    loginSuccess,
  };
}

export function setLoginError(LoginError) {
  return {
    type: types.SET_LOGIN_ERROR,
    LoginError,
  };
}

export function fetchServiceSuccess(serviceResponse) {
  return {
    serviceResponse,
    type: types.FETCH_SERVICES_SUCCESS,
  };
}

export function fetchServiceFailed(error) {
  return {
    error,
    type: types.FETCH_SERVICES_FAILED,
  };
}

export function addNewService(service) {
  return {
    service,
    type: types.ADD_SERVICE,
  };
}

export function saveServicesSuccess(response) {
  return {
    response,
    type: types.SAVE_SERVICES_SUCCESS,
  };
}

export function saveServicesError(saveErr) {
  return {
    saveErr,
    type: types.SAVE_SERVICES_ERROR,
  };
}

export function updateServiceSuccess(updateResponse) {
  return {
    updateResponse,
    type: types.UPDATE_SERVICES_SUCCESS,
  };
}

export function updateServiceFailed(updateErr) {
  return {
    updateErr,
    type: types.UPDATE_SERVICES_ERROR,
  };
}

export function fetchUserSuccess(userResponse) {
  return {
    userResponse,
    type: types.FETCH_USERS_SUCCESS,
  };
}

export function fetchUserError(userError) {
  return {
    userError,
    type: types.FETCH_USERS_ERROR,
  };
}

/**
 *
 * Login Endpoint call Action
 *
 * @param {userId,rawPassPhrase} options
 */
export function travelOnLogin(options) {
  console.log('travel', options);
  return (dispatch) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    $.ajax({
      type: 'POST',
      url: 'http://159.65.151.187/taumservice/login/',
      data: options,
      headers: {
        loginLoc: 'Chennai',
      },
    })
      .done((response) => {
        console.log('Login Success', response);
        if (response.responseHeader.responseCode === 400) {
          Auth.authenticateUser(response.userDetails);
          dispatch(setLoginSuccess(true));
          browserHistory.push('/app/');
        } else {
          console.log('Error', response.errors);
          dispatch(setLoginError(response.responseHeader.responseMessage));
        }
      })
      .fail((error) => {
        console.log('Error ajax', error);
        dispatch(setLoginError(error));
      });
  };
}

export function travelFetchServices(options) {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: 'http://159.89.162.246/taadmservice/fetchServices/',
      headers: {
        userId: options.userId,
      },
      data: {},
    })
      .done((response) => {
        if (response.responseHeader.responseCode === 400) {
          if (response && response.message === 'Failed to authenticate token.') {
            Auth.deauthenticateUser();
            browserHistory.push('/app/login');
          } else {
            dispatch(fetchServiceSuccess(response));
          }
        } else {
          console.log('Error', response.errors);
          dispatch(fetchServiceFailed(response.responseHeader.responseMessage));
        }
      })
      .fail((error) => {
        console.log('Error ajax', error);
        dispatch(fetchServiceFailed(error));
      });
  };
}

export function travelSaveServices(options) {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: 'http://159.89.162.246/taadmservice/saveServices/',
      data: options,
    })
      .done((response) => {
        if (response.responseHeader.responseCode === 400) {
          if (response && response.message === 'Failed to authenticate token.') {
            Auth.deauthenticateUser();
            browserHistory.push('/app/login');
          } else {
            dispatch(saveServicesSuccess(response));
          }
        } else {
          console.log('Error', response.errors);
          dispatch(saveServicesError(response.responseHeader.responseMessage));
        }
      })
      .fail((error) => {
        console.log('Error ajax', error);
        dispatch(saveServicesError(error));
      });
  };
}
export function travelUpdateServices(options) {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: 'http://159.89.162.246/taadmservice/updateServices/',
      data: options,
    })
      .done((response) => {
        if (response.responseHeader.responseCode === 400) {
          if (response && response.message === 'Failed to authenticate token.') {
            Auth.deauthenticateUser();
            browserHistory.push('/app/login');
          } else {
            dispatch(updateServiceSuccess(response));
          }
        } else {
          console.log('Error', response.errors);
          dispatch(updateServiceFailed(response.responseHeader.responseMessage));
        }
      })
      .fail((error) => {
        console.log('Error ajax', error);
        dispatch(updateServiceFailed(error));
      });
  };
}
export function travelUserFetch(options) {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: 'http://159.89.162.246/taumservice/fetchUserData/',
      data: options,
    })
      .done((response) => {
        if (response.responseHeader.responseCode === 400) {
          if (response && response.message === 'Failed to authenticate token.') {
            Auth.deauthenticateUser();
            browserHistory.push('/app/login');
          } else {
            dispatch(fetchUserSuccess(response));
          }
        } else {
          console.log('Error', response.errors);
          dispatch(fetchUserError(response.responseHeader.responseMessage));
        }
      })
      .fail((error) => {
        console.log('Error ajax', error);
        dispatch(fetchUserError(error));
      });
  };
}
