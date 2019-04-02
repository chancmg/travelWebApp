import Auth from "./auth";
import { BASE_URL } from "../constants";

export { getData, postData };

function addAuthentication(xhttp) {
  const userData = Auth.getToken();
  if (userData) {
    xhttp.setRequestHeader("Authorization", `Token ${userData}`);
  } else {
    console.error("Error in user data in localstorage");
    // Redirect to Signup
  }
}

// function addXToken(xhttp) {
//   xhttp.setRequestHeader("X-Ticket-Id", appService.getAppId());
// }

// function addAppVerion(xhttp) {
//   xhttp.setRequestHeader("X-APP-VERSION", X_APP_VERSION); //eslint-disable-line
// }

function handleError(xhttp, status, cb) {
  const data = xhttp.responseText ? JSON.parse(xhttp.responseText) : {};

  return cb({
    message: xhttp.statusText,
    code: status,
    data
  });
}

function handleSuccess(xhttp, cb) {
  const data = xhttp.responseText;
  let jsonResponse = {};
  try {
    jsonResponse = JSON.parse(data);
  } catch (e) {
    console.error("Error in parsing response text", e);
  } finally {
    cb(null, jsonResponse);
  }
}

function handleResponse(xhttp, status, cb) {
  if (status === 200 || status === 201) {
    return handleSuccess(xhttp, cb);
  }
  return handleError(xhttp, status, cb);
}

function getData(path, requireAuth, cb) {
  const xhttp = new XMLHttpRequest();
  const URL = `${BASE_URL}${path}`;
  xhttp.onreadystatechange = function onreadystatechange() {
    if (this.readyState === 4) {
      handleResponse(xhttp, this.status, cb);
    }
  };
  xhttp.open("GET", URL, true);
  if (requireAuth) {
    addAuthentication(xhttp);
  }
  xhttp.send();
}

function postData(path, body, requireAuth, cb) {
  const xhttp = new XMLHttpRequest();
  const URL = `${BASE_URL}${path}`;
  xhttp.onreadystatechange = function onreadystatechange() {
    if (this.readyState === 4) {
      handleResponse(xhttp, this.status, cb);
    }
  };
  xhttp.open("POST", URL, true);
  if (requireAuth) {
    addAuthentication(xhttp);
  }
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(body);
}
