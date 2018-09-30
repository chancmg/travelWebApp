import { routerReducer as routing } from 'react-router-redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import momentTimeZone from 'moment-timezone';
const TIME_ZONE = 'Asia/Kolkata';
const getTime = function() {
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
    user: {
        name: '',
        password: ''
    },
    signUpUser: {
        name: '',
        password: '',
        access: ''
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
    reportData: []

};

const filter = (state = initialState, action) => {
    console.log(state);
    console.log(action.type);
    switch (action.type) {
        case LOCATION_CHANGE:
            return Object.assign({}, state, {
                currentUser: sessionStorage.getItem('currentUser') || '---',
                admin: JSON.parse(sessionStorage.getItem('admin')) || false,
                currentUserAccess: sessionStorage.getItem('access') || '--',
                reportData: []
            });
        case types.FETCH_FILTER_DATA_SUCCESSFULLY:
            console.log('reducer filter data', action.filterData);
            return Object.assign({}, state, {
                filterData: action.filterData
            });
        case types.LOGIN_ON_CHANGE:
            const key = action.key;
            const value = action.value;
            const userObj = state.user;
            userObj[key] = value;
            return Object.assign({}, state, {
                user: userObj
            });
        case types.SIGNUP_ON_CHANGE:
            const username = action.key;
            const uservalue = action.value;
            const signObj = state.signUpUser;
            userObj[username] = uservalue;
            return Object.assign({}, state, {
                signUpUser: signObj
            });
        case types.ATPUPLOAD_ON_CHANGE:
            return Object.assign({}, state, {
                file: action.file
            });
        case types.SET_LOGIN_PENDING:
            return Object.assign({}, state, {
                isLoginPending: action.isLoginPending
            });
        case types.SET_LOGIN_SUCCESS:
            sessionStorage.setItem('currentUser', action.loginSuccess.user);
            sessionStorage.setItem('admin', JSON.stringify(action.loginSuccess.admin ? action.loginSuccess.admin : false));
            sessionStorage.setItem('access', action.loginSuccess.access);
            return Object.assign({}, state, {
                isLoginSuccess: action.loginSuccess.success,
                currentUser: action.loginSuccess.user,
                admin: action.loginSuccess.admin,
                currentUserAccess: action.loginSuccess.access,
                reportHudFilter: action.loginSuccess.access,
                hudFilter: action.loginSuccess.access
            });
        case types.SET_SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: action.signUpSuccess.success,
            });
        case types.SET_LOGIN_ERROR:
            console.log(action.LoginError);
            return Object.assign({}, state, {
                loginErrors: action.LoginError
            });
        case types.ATPUPLOAD_DOCUMENT_SUCCESS:
            console.log('reducer upload success', action.isUploadSuccess);
            return Object.assign({}, state, {
                isUploadSuccess: action.isUploadSuccess
            });
        case types.ATPUPLOAD_DOCUMENT_FAILED:
            console.log(action.isUploadFail);
            return Object.assign({}, state, {
                isUploadFail: action.isUploadFail
            });
        case types.FILTER_HUD:
            return Object.assign({}, state, {
                hudFilter: action.filter
            });
        case types.FILTER_BLOCK:
            return Object.assign({}, state, {
                blockFilter: action.filter
            });
        case types.FILTER_WEEK:
            return Object.assign({}, state, {
                weekFilter: action.filter
            });
        case types.FILTER_MONTH:
            return Object.assign({}, state, {
                monthFilter: action.filter
            });
        case types.FILTER_YEAR:
            return Object.assign({}, state, {
                yearFilter: action.filter
            });
        case types.FILTER_REPORT_DATE:
            return Object.assign({}, state, {
                reportDateFilter: action.filter
            });
        case types.FILTER_REPORT_HUD:
            return Object.assign({}, state, {
                reportHudFilter: action.filter
            });
        case types.FILTER_REPORT_BLOCK:
            return Object.assign({}, state, {
                reportBlockFilter: action.filter
            });
        case types.FILTER_DATE:
            console.log('filter date', action.filter);
            return Object.assign({}, state, {
                dateFilter: action.filter
            });
        case types.OPEN_DATA:
            return Object.assign({}, state, {
                dataToShow: action.data
            });
        case types.CLOSE_DATA:
            return Object.assign({}, state, {
                dataToShow: {}
            });
        case types.SHOW_LIST_DATA:
            return Object.assign({}, state, {
                selectedList: action.selectedList
            });

        case types.RESET_FILTER :
            return Object.assign({}, state, {
                reportHudFilter: state.currentUserAccess,
                reportBlockFilter: undefined,
                weekFilter: undefined,
                reportDateFilter: getTime().format('DD.MM.YYYY'),
                monthFilter: undefined,
                yearFilter: undefined,
                reportData: []
            });
        case types.FETCH_VEHICLES_ATTEMPT:
            return Object.assign({}, state, {
                isFetching: true,
                isFetched: false,
                error: null,
                vehicles: {}
            });
        case types.FETCH_VEHICLES_FAILED:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
                isFetched: false
            });
        case types.FETCH_VEHICLES_SUCCESSFULLY:
            return Object.assign({}, state, {
                error: null,
                isFetching: false,
                isFetched: true,
                vehicles: action.response
            });
        case types.FETCH_SINGLE_VEHICLE_ATTEMPT:
            return Object.assign({}, state, {
                isFetchingTrack: true,
                isFetchedTrack: false,
                errorTrack: null,
                single_vehicle: {}
            });
        case types.FETCH_SINGLE_VEHICLE_FAILED:
            return Object.assign({}, state, {
                errorTrack: action.error,
                isFetchingTrack: false,
                isFetchedTrack: false
            });
        case types.FETCH_SINGLE_VEHICLE_SUCCESSFULLY:
            return Object.assign({}, state, {
                errorTrack: null,
                isFetchingTrack: false,
                isFetchedTrack: true,
                single_vehicle: action.response
            });
        case types.FETCH_ATP_ATTEMPT:
            return Object.assign({}, state, {
                isFetchingATP: true,
                isFetchedATP: false,
                errorATP: null,
                atp: []
            });
        case types.FETCH_ATP_FAILED:
            return Object.assign({}, state, {
                errorATP: action.error,
                isFetchingATP: false,
                isFetchedATP: false
            });
        case types.FETCH_ATP_SUCCESSFULLY:
            return Object.assign({}, state, {
                errorReports: null,
                isFetchingReports: false,
                isFetchedReports: true,
                atp: action.response
            });
        case types.FETCH_REPORTS_ATTEMPT:
            return Object.assign({}, state, {
                isFetchingReports: true,
                isFetchedReports: false,
                errorReports: null,
                report: []
            });
        case types.FETCH_REPORTS_FAILED:
            return Object.assign({}, state, {
                errorReports: action.error,
                isFetchingReports: false,
                isFetchedReports: false
            });
        case types.FETCH_REPORTS_SUCCESSFULLY:
            return Object.assign({}, state, {
                errorReports: null,
                isFetchingReports: false,
                isFetchedReports: true,
                report: action.response
            });
        case types.FETCH_GRID_REPORTS_ATTEMPT:
            return Object.assign({}, state, {
                isFetchingReports: true,
                isFetchedReports: false,
                errorReports: null,
                reportData: []
            });
        case types.FETCH_GRID_REPORTS_FAILED:
            return Object.assign({}, state, {
                errorReports: action.error,
                isFetchingReports: false,
                isFetchedReports: false
            });
        case types.FETCH_GRID_REPORTS_SUCCESSFULLY:
            return Object.assign({}, state, {
                errorReports: null,
                isFetchingReports: false,
                isFetchedReports: true,
                reportData: action.response
            });
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    filter,
    routing
});

export default rootReducer;
