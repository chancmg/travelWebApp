import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";
import * as types from "../actions/types";

const initialState = {
  commonError: {
    errorMessage: "Something went wrong"
  },
  DIALOG_OPEN: false,
  SERVICE_DIALOG_OPEN: false,
  DRAWER_OPEN: true,
  serviceDetails: [],
  user: { userId: "", rawPassPhrase: "" },
  loginErrors: { errorMessage: "" },
  form_type: "",
  editableService: {
    serviceDesc: "",
    serviceStatus: 0,
    serviceChanged: "",
    statusChanged: 0
  },
  selectedService: {}
};

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
      console.log("login error", action.LoginError);
      return Object.assign({}, state, {
        loginErrors: action.LoginError
      });
    case types.FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        commonError: action.userError
      });
    case types.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        usersList: action.userResponse.response.userDetails
      });
    case types.FETCH_SERVICES_SUCCESS:
      return Object.assign({}, state, {
        serviceDetails: action.serviceResponse.serviceDetails
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
    case types.DialogActionType.ON_DIALOG_TOGGLE: {
      return Object.assign({}, state, { DIALOG_OPEN: action.toggle });
    }
    case types.DialogActionType.ON_SERVICE_DIALOG_TOGGLE: {
      return { ...state, SERVICE_DIALOG_OPEN: action.toggle };
    }
    case types.FormActionType.FORM_TYPE: {
      return { ...state, form_type: action.payload };
    }

    case types.SAVE_SERVICES_ERROR: {
      alert(action.saveErr);
      return { ...state, form_error: action.saveErr };
    }
    case types.SAVE_SERVICES_SUCCESS: {
      alert(action.response);
      return { ...state, form_success: action.response };
    }

    case types.UPDATE_SERVICES_SUCCESS: {
      alert(action.updateResponse);
      return { ...state, form_success: action.updateResponse };
    }
    case types.UPDATE_SERVICES_ERROR: {
      alert(action.updateErr);
      return { ...state, form_error: action.updateErr };
    }

    case types.FormActionType.FORM_SUCCESS: {
      alert(action.item);
      return { ...state, form_success: action.item };
    }
    case types.FormActionType.FORM_ERROR: {
      alert(action.item);
      return { ...state, form_error: action.item };
    }
    case types.DrawerActionType.ON_DRAWER_TOGGLE: {
      return {
        ...state,
        DRAWER_OPEN: action.toggle
      };
    }
    case types.FormActionType.ON_SERVICE_FORM_CHANGE: {
      let changes = state.editableService;
      changes[action.key] = action.value;
      return Object.assign({}, state, { editableService: changes });
    }
    case types.USER_MENU_TOGGLE: {
      return {
        ...state,
        menuAnchor: action.toggle
      };
    }
    case types.SERVICE_TO_EDIT: {
      return {
        ...state,
        editableService: action.payload
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  travelStore,
  routing
});

export default rootReducer;
