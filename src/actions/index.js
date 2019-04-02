import $ from "jquery";
import { history as browserHistory } from "../history";
import * as types from "./types";
import Auth from "../modules/auth";

const BASE_URL = "https://cors-anywhere.herokuapp.com/http://139.59.32.41:8117";

export function loginOnChange(value, key) {
  return {
    type: types.LOGIN_ON_CHANGE,
    key,
    value
  };
}

export function setLoginPending(isLoginPending) {
  return {
    type: types.SET_LOGIN_PENDING,
    isLoginPending
  };
}

export function setLoginSuccess(loginSuccess) {
  return {
    type: types.SET_LOGIN_SUCCESS,
    loginSuccess
  };
}

export function setLoginError(LoginError) {
  return {
    type: types.SET_LOGIN_ERROR,
    LoginError
  };
}

export function fetchServiceSuccess(serviceResponse) {
  return {
    serviceResponse,
    type: types.FETCH_SERVICES_SUCCESS
  };
}

export function fetchServiceFailed(error) {
  return {
    error,
    type: types.FETCH_SERVICES_FAILED
  };
}

export function addNewService(service) {
  return {
    service,
    type: types.ADD_SERVICE
  };
}

export function saveServicesSuccess(response) {
  return {
    response,
    type: types.SAVE_SERVICES_SUCCESS
  };
}

export function saveServicesError(saveErr) {
  return {
    saveErr,
    type: types.SAVE_SERVICES_ERROR
  };
}

export function updateServiceSuccess(updateResponse) {
  return {
    updateResponse,
    type: types.UPDATE_SERVICES_SUCCESS
  };
}

export function updateServiceFailed(updateErr) {
  return {
    updateErr,
    type: types.UPDATE_SERVICES_ERROR
  };
}

export function fetchUserSuccess(userResponse) {
  return {
    userResponse,
    type: types.FETCH_USERS_SUCCESS
  };
}

export function fetchUserError(userError) {
  return {
    userError,
    type: types.FETCH_USERS_ERROR
  };
}

// Dialog actions

export function dialogOnToggle(toggle) {
  return {
    type: types.DialogActionType.ON_DIALOG_TOGGLE,
    toggle
  };
}

export function serviceDialogOnToggle(toggle) {
  return {
    type: types.DialogActionType.ON_SERVICE_DIALOG_TOGGLE,
    toggle
  };
}

//drawer
export function drawerOnToggle(toggle) {
  return {
    type: types.DrawerActionType.ON_DRAWER_TOGGLE,
    toggle
  };
}

export function userMenuOnToggle(toggle) {
  return {
    type: types.USER_MENU_TOGGLE,
    toggle
  };
}

export function formOnChange(value, key) {
  return {
    type: types.FormActionType.ON_SERVICE_FORM_CHANGE,
    key,
    value
  };
}

export function formTypeChange(type) {
  return {
    type: types.FormActionType.FORM_TYPE,
    payload: type
  };
}

export function onEditData(data) {
  return {
    type: types.SERVICE_TO_EDIT,
    payload: data
  };
}

export function onEditService(data) {
  return dispatch => {
    dispatch(formTypeChange("Edit"));
    dispatch(onEditData(data));
    dispatch(serviceDialogOnToggle(true));
  };
}

export function onAddService() {
  return dispatch => {
    dispatch(formTypeChange("Add"));
    dispatch(onEditData({ serviceDesc: "", serviceStatus: "1" }));
    dispatch(serviceDialogOnToggle(true));
  };
}

export function formOnSubmit(travelStore) {
  return dispatch => {
    const { editableService, serviceDetails, form_type } = travelStore;
    if (form_type === "Edit") {
      serviceDetails.forEach(n => {
        if (n.serviceId === editableService.serviceId) {
          if (n.serviceStatus !== editableService.serviceStatus) {
            const activated = serviceStatus => {
              if (serviceStatus === "1") return true;
              return false;
            };
            dispatch(
              travelUpdateServices({
                serviceId: editableService.serviceId,
                actionCode: "7002",
                doActivate: activated(editableService.serviceStatus)
              })
            );
          }

          if (n.serviceDesc !== editableService.serviceDesc) {
            dispatch(
              travelUpdateServices({
                serviceId: editableService.serviceId,
                actionCode: "7001",
                serviceDesc: editableService.serviceDesc
              })
            );
          }
        }
      });
    } else {
      dispatch(
        travelSaveServices({ serviceDesc: editableService.serviceDesc })
      );
    }
  };

  // function success(item) {
  //   return { type: types.FormActionType.FORM_SUCCESS, item };
  // }

  // function error(item) {
  //   return { type: types.FormActionType.FORM_ERROR, item };
  // }

  // function addService(serviceDesc) {
  //   return dispatch => {
  //     $.ajax({
  //       type: "POST",
  //       url: BASE_URL + "/taadmservice/saveServices/",
  //       data: JSON.stringify({serviceDesc}),
  //       contentType: "application/json",
  //     })
  //       .done(data => {
  //         dispatch(serviceDialogOnToggle(false));
  //         dispatch(success(data));
  //       })
  //       .fail(errorData => {
  //         dispatch(error(errorData));
  //       });
  //   };
  // }
}

/**
 *
 * Login Endpoint call Action
 *
 * @param {userId,rawPassPhrase} options
 */
export function travelOnLogin(options) {
  return dispatch => {
    // dispatch(setLoginPending(true));
    // dispatch(setLoginSuccess(false));
    // dispatch(setLoginError(null));
    $.ajax({
      type: "POST",
      url: BASE_URL + "/taumservice/login/",
      data: JSON.stringify(options),
      contentType: "application/json",
      headers: {
        loginLoc: "Chennai"
      }
    })
      .done(data => {
        const { responseHeader, response } = data;
        if (responseHeader.responseCode === "400") {
          Auth.authenticateUser(response.userDetails);
          dispatch(setLoginSuccess(true));

          // this.props.history.push(from);
          browserHistory.push("/");
        } else {
          console.log("Error", response);
          dispatch(setLoginError(responseHeader.responseMessage));
        }
      })
      .fail(error => {
        console.log("Error ajax", error);
        dispatch(setLoginError(error));
      });
  };
}

export function travelFetchServices(options) {
  return dispatch => {
    $.ajax({
      type: "POST",
      url: BASE_URL + "/taadmservice/fetchServices/",
      headers: {
        userId: options.userId
      },
      contentType: "application/json",
      data: {}
    })
      .done(response => {
        if (response.responseHeader.responseCode === "400") {
          if (
            response &&
            response.message === "Failed to authenticate token."
          ) {
            Auth.deauthenticateUser();
            browserHistory.push("/login");
          } else {
            dispatch(fetchServiceSuccess(response.response));
          }
        } else {
          console.log("Error", response.errors);
          dispatch(fetchServiceFailed(response.responseHeader.responseMessage));
        }
      })
      .fail(error => {
        console.log("Error ajax", error);
        dispatch(fetchServiceFailed(error));
      });
  };
}

export function travelSaveServices(options) {
  return dispatch => {
    $.ajax({
      type: "POST",
      url: BASE_URL + "/taadmservice/saveServices/",
      data: JSON.stringify(options),
      headers: {
        userId: "WAG1"
      },
      contentType: "application/json"
    })
      .done(response => {
        if (response.responseHeader.responseCode === "400") {
          if (
            response &&
            response.message === "Failed to authenticate token."
          ) {
            Auth.deauthenticateUser();
            browserHistory.push("/login");
          } else {
            dispatch(serviceDialogOnToggle(false));
            dispatch(saveServicesSuccess(response.response));
          }
        } else {
          console.log("Error", response.errors);
          dispatch(saveServicesError(response.responseHeader.responseMessage));
        }
      })
      .fail(error => {
        console.log("Error ajax", error);
        dispatch(saveServicesError(error));
      });
  };
}
export function travelUpdateServices(options) {
  return dispatch => {
    $.ajax({
      type: "POST",
      url: BASE_URL + "/taadmservice/updateServices/",
      data: JSON.stringify(options),
      headers: {
        userId: "WAG1"
      },
      contentType: "application/json"
    })
      .done(response => {
        if (response.responseHeader.responseCode === "400") {
          if (
            response &&
            response.message === "Failed to authenticate token."
          ) {
            Auth.deauthenticateUser();
            browserHistory.push("/login");
          } else {
            dispatch(serviceDialogOnToggle(false));
            dispatch(updateServiceSuccess(response));
          }
        } else {
          console.log("Error", response.errors);
          dispatch(
            updateServiceFailed(response.responseHeader.responseMessage)
          );
        }
      })
      .fail(error => {
        console.log("Error ajax", error);
        dispatch(updateServiceFailed(error));
      });
  };
}
export function travelUserFetch(options) {
  return dispatch => {
    $.ajax({
      type: "POST",
      url: BASE_URL + "/taumservice/fetchUserData/",
      contentType: "application/json",
      data: JSON.stringify({
        userId: "WAG1",
        actionCode: "1050"
      })
    })
      .done(response => {
        if (response.responseHeader.responseCode === "400") {
          if (
            response &&
            response.message === "Failed to authenticate token."
          ) {
            Auth.deauthenticateUser();
            browserHistory.push("/login");
          } else {
            dispatch(fetchUserSuccess(response));
            dispatch(travelFetchServices({ userId: "WAG1" }));
          }
        } else {
          console.log("Error", response.errors);
          dispatch(fetchUserError(response.responseHeader.responseMessage));
        }
      })
      .fail(error => {
        console.log("Error ajax", error);
        dispatch(fetchUserError(error));
      });
  };
}
