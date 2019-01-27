import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";

const initalState = { commonError: {}, serviceDetails: {}, user: {} };

const travelStore = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_ON_CHANGE: {
      const { key, value } = action;
      const userObj = state.user;
      userObj[key] = value;
      return Object.assign({}, state, {
        user: userObj
      });
    }
    case types.SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });
    case types.SET_LOGIN_SUCCESS:
      localStorage.setItem("currentUser", action.loginSuccess);
      return Object.assign({}, state, {
        isLoginSuccess: true,
        currentUser: action.loginSuccess
      });
    case types.SET_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.signUpSuccess.success
      });
    case types.SET_LOGIN_ERROR:
      console.log(action.LoginError);
      return Object.assign({}, state, {
        loginErrors: action.LoginError
      });
    case types.FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        commonError: action.userError
      });
    case types.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        usersList: action.userResponse
      });
    case types.FETCH_SERVICES_SUCCESS:
      return Object.assign({}, state, {
        serviceDetails: action.serviceResponse.response.serviceDetails
      });
    case types.FETCH_SERVICES_FAILED:
      return Object.assign({}, state, {
        commonError: action.error
      });
    case types.ADD_SERVICE:
      return {
        ...state,
        serviceDetails: { ...state.serviceDetails, ...action.service }
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  travelStore,
  routing
});

export default rootReducer;
