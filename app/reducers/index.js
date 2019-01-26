import { routerReducer as routing, LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux';
import momentTimeZone from 'moment-timezone';
import * as types from '../actions/types';

const TIME_ZONE = 'Asia/Kolkata';
const getTime = function () {
  const time = momentTimeZone();
  time.tz(TIME_ZONE);
  return time;
};
const initialState = {
  hudFilter: undefined,
  blockFilter: undefined,
  dateFilter: getTime().format('DD.MM.YYYY'),
  dataToShow: {},
  atp: [],
  report: [],
  single_vehicle: {},
  selectedList: '',
  isLoginSuccess: false,
  isLoginPending: false,
  currentUser: sessionStorage.getItem('currentUser') || '---',
  admin: JSON.parse(sessionStorage.getItem('admin')) || false,
  currentUserAccess: sessionStorage.getItem('access') || '--',
  user: {},
  signUpUser: {
    name: '',
    password: '',
    access: '',
  },
  loginErrors: {},
  isUploadSuccess: false,
  isUploadFail: false,
  file: undefined,
  filterData: {},
  reportDateFilter: getTime().format('DD.MM.YYYY'),
  reportHudFilter: undefined,
  reportBlockFilter: undefined,
  weekFilter: undefined,
  monthFilter: undefined,
  yearFilter: undefined,
  reportData: [],
  commonError: {},
  serviceDetails: {},
};

const travelStore = (state = initialState, action) => {
  console.log(state);
  console.log(action.type);
  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        currentUser: sessionStorage.getItem('currentUser') || '---',
        admin: JSON.parse(sessionStorage.getItem('admin')) || false,
        currentUserAccess: sessionStorage.getItem('access') || '--',
        reportData: [],
      });
    case types.LOGIN_ON_CHANGE: {
      const { key, value } = action;
      const userObj = state.user;
      userObj[key] = value;
      return Object.assign({}, state, {
        user: userObj,
      });
    }
    case types.SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending,
      });
    case types.SET_LOGIN_SUCCESS:
      localStorage.setItem('currentUser', action.loginSuccess);
      return Object.assign({}, state, {
        isLoginSuccess: true,
        currentUser: action.loginSuccess,
      });
    case types.SET_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.signUpSuccess.success,
      });
    case types.SET_LOGIN_ERROR:
      console.log(action.LoginError);
      return Object.assign({}, state, {
        loginErrors: action.LoginError,
      });
    case types.FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        commonError: action.userError,
      });
    case types.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        usersList: action.userResponse,
      });
    case types.FETCH_SERVICES_SUCCESS:
      return Object.assign({}, state, {
        serviceDetails: action.serviceResponse.response.serviceDetails,
      });
    case types.FETCH_SERVICES_FAILED:
      return Object.assign({}, state, {
        commonError: action.error,
      });
    case types.ADD_SERVICE:
      return { ...state, serviceDetails: { ...state.serviceDetails, ...action.service } };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  travelStore,
  routing,
});

export default rootReducer;
