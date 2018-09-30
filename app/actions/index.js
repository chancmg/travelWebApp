import * as types from './types';
import $ from 'jquery';
import momentTimeZone from 'moment-timezone';
import Auth from '../modules/auth';
import { browserHistory } from 'react-router';
const TIME_ZONE = 'Asia/Kolkata';
const getTime = function() {
    const time = momentTimeZone();
    time.tz(TIME_ZONE);
    return time;
};


export function uploadSuccess(isUploadSuccess) {
    console.log('upload succes', isUploadSuccess);
    return{
        type: types.ATPUPLOAD_DOCUMENT_SUCCESS,
        isUploadSuccess
    };
}

export function uploadFail(isUploadFailed) {
    return {
        type: types.ATPUPLOAD_DOCUMENT_FAILED,
        isUploadFailed
    };
}

export function loginOnChange(value, key) {
    return {
        type: types.LOGIN_ON_CHANGE,
        key: key,
        value: value
    };
}

export function signUpOnChange(value, key) {
    return {
        type: types.SIGNUP_ON_CHANGE,
        key: key,
        value: value
    };
}

export function setLoginPending(isLoginPending) {
    return {
        type: types.SET_LOGIN_PENDING,
        isLoginPending

    };
}
export function setSignUpPending(isPending) {
    return{
        type: types.SET_SIGNUP_PENDING,
        isPending
    };
}
export function atpuploadOnChange(file) {
    return {
        type: types.ATPUPLOAD_ON_CHANGE,
        file: file
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

export function setSignUpSuccess(loginSuccess) {
    return {
        type: types.SET_SIGNUP_SUCCESS,
        loginSuccess
    };
}

export function setSignUpError(LoginError) {
    return {
        type: types.SET_SIGNUP_ERROR,
        LoginError
    };
}

export function filterWeek(filter) {
    return {
        type: types.FILTER_WEEK,
        filter
    };
}
export function filterMonth(filter) {
    return {
        type: types.FILTER_MONTH,
        filter
    };
}
export function filterYear(filter) {
    return {
        type: types.FILTER_YEAR,
        filter
    };
}

export function filterReportDate(filter) {
    return{
        type: types.FILTER_REPORT_DATE,
        filter
    };
}

export function filterReportHUD(filter) {
    return{
        type: types.FILTER_REPORT_HUD,
        filter
    };
}

export function accessHUD(filter) {
    return{
        type: types.ACCESS_HUD,
        filter
    };
}
export function filterReportBlock(filter) {
    return{
        type: types.FILTER_REPORT_BLOCK,
        filter
    };
}
export function filterAtp(filter) {
    return dispatch => {
        dispatch({ type: types.FILTER_HUD, filter});
    };
}

export function filterBlock(filter) {
    return {
        type: types.FILTER_BLOCK,
        filter
    };
}

export function filterDate(filter) {
    console.log(filter);
    return {
        type: types.FILTER_DATE,
        filter
    };
}

export function resetFilter(filter) {
    return{
        type: types.RESET_FILTER,
        filter
    };
}

export function showListData(type) {
    return {
        type: types.SHOW_LIST_DATA,
        selectedList: type,
    };
}

export function openData(data) {
    return {
        type: types.OPEN_DATA,
        data
    };
}

export function closeData() {
    return {
        type: types.CLOSE_DATA
    };
}

export function batchActions(...actions) {
    return {
        type: types.BATCH_ACTIONS,
        actions: actions
    };
}

export function fetchVehiclesFailed(error) {
    return { error, type: types.FETCH_VEHICLES_FAILED };
}

export function fetchVehiclesSuccess(response) {
    return { response, type: types.FETCH_VEHICLES_SUCCESSFULLY };
}

export function fetchVehiclesAttempt() {
    return { type: types.FETCH_VEHICLES_ATTEMPT };
}
export function fetchFilterDataSuccess(filterData) {
    console.log('filter fetch success', filterData);
    return { filterData, type: types.FETCH_FILTER_DATA_SUCCESSFULLY};
}

export function fetchData(data) {
    return dispatch => {
        dispatch({ type: types.OPEN_DATA, data });
        dispatch({ type: types.FETCH_VEHICLES_ATTEMPT });
        $.ajax({
            url: '/api/allvehicles',
            headers: {'x-access-token': Auth.getToken()}
        })
        .done(function(response) {
            if(response && response.message === 'Failed to authenticate token.') {
                Auth.deauthenticateUser();
                browserHistory.push('/app/login');
            }else{
                dispatch(fetchVehiclesSuccess(response));
            }
        })
        .fail(function(xhr) {
            console.log(xhr);
            dispatch(fetchVehiclesFailed(xhr));
        });
    };
}

export function fetchVSingleehiclesFailed(error) {
    return { error, type: types.FETCH_SINGLE_VEHICLE_FAILED };
}

export function fetchSingleVehiclesSuccess(response) {
    return { response, type: types.FETCH_SINGLE_VEHICLE_SUCCESSFULLY };
}

export function fetchSingleVehicleAttempt() {
    return { type: types.FETCH_SINGLE_VEHICLE_ATTEMPT };
}

export function fetchVehicleData(data) {
    const vehicleNo = data && data.vehicle && data.vehicle.replace(/ /g, '');
    return dispatch => {
        dispatch({ type: types.OPEN_DATA, data });
        dispatch({ type: types.FETCH_SINGLE_VEHICLE_ATTEMPT });
        $.ajax({
            url: '/api/recentvehicles/' + vehicleNo,
            headers: {'x-access-token': Auth.getToken()}
        })
        .done(function(response) {
            if(response && response.message === 'Failed to authenticate token.') {
                Auth.deauthenticateUser();
                browserHistory.push('/app/login');
            }else{
                dispatch(fetchSingleVehiclesSuccess(response));
            }
        })
        .fail(function(xhr) {
            console.log(xhr);
            dispatch(fetchVSingleehiclesFailed(xhr));
        });
    };
}


export function fetchATPFailed(error) {
    return { error, type: types.FETCH_ATP_FAILED };
}

export function fetchFilterDataFailed(error) {
    return { error, type: types.FETCH_FILTER_DATA_FAILED };
}
export function fetchATPSuccess(response) {
    return { response, type: types.FETCH_ATP_SUCCESSFULLY };
}

export function fetchATPAttempt() {
    return { type: types.FETCH_ATP_ATTEMPT };
}

export function fetchATPData(filter) {
    const actualFilter = {
        hud: filter.hudFilter || 'Tirunelveli',
        block: filter.blockFilter,
        date: filter.dateFilter || getTime().format('DD.MM.YYYY')
    };
    console.log('fetch atp data', JSON.stringify(actualFilter));
    return dispatch => {
        $.ajax({
            url: '/api/atp',
            data: actualFilter,
            headers: {'x-access-token': Auth.getToken()}
        })
        .done(function(response) {
            if(response && response.message === 'Failed to authenticate token.') {
                Auth.deauthenticateUser();
                browserHistory.push('/app/login');
            }else{
                dispatch(fetchATPSuccess(response));
            }
        })
        .fail(function(xhr) {
            console.log(xhr);
            dispatch(fetchATPFailed(xhr));
        });
    };
}
export function fetchGridReportsFailed(error) {
    return { error, type: types.FETCH_GRID_REPORTS_FAILED };
}

export function fetchGridReportsSuccess(response) {
    return { response, type: types.FETCH_GRID_REPORTS_SUCCESSFULLY };
}

export function fetchGridReportsAttempt() {
    return { type: types.FETCH_GRID_REPORTS_ATTEMPT };
}
export function fetchReport(filter) {
    const actualFilter = {
        hud: filter.reportHudFilter,
        block: filter.reportBlockFilter,
        date: filter.reportDateFilter || getTime().format('DD.MM.YYYY'),
        week: filter.weekFilter,
        year: filter.yearFilter,
        month: filter.monthFilter

    };
    console.log('Fetch report', actualFilter);
    return dispatch => {
        $.ajax({
            url: '/api/fetchReport',
            data: actualFilter,
            headers: {'x-access-token': Auth.getToken()}
        })
        .done(function(response) {
            if(response && response.message === 'Failed to authenticate token.') {
                Auth.deauthenticateUser();
                browserHistory.push('/app/login');
            }else{
                dispatch(fetchGridReportsSuccess(response));
            }
        })
        .fail(function(xhr) {
            console.log(xhr);
            dispatch(fetchGridReportsFailed(xhr));
        });
    };
}


export function fetchReportsFailed(error) {
    return { error, type: types.FETCH_REPORTS_FAILED };
}

export function fetchReportsSuccess(response) {
    return { response, type: types.FETCH_REPORTS_SUCCESSFULLY };
}

export function fetchReportsAttempt() {
    return { type: types.FETCH_REPORTS_ATTEMPT };
}
export function fetchFilterData() {
    return dispatch => {
        $.ajax({
            url: '/api/atp/filters',
            headers: {'x-access-token': Auth.getToken()}
        })
        .done(function(response) {
            if(response && response.message === 'Failed to authenticate token.') {
                Auth.deauthenticateUser();
                browserHistory.push('/app/login');
            }else{
                dispatch(fetchFilterDataSuccess(response));
            }
        })
        .fail(function(xhr) {
            console.log(xhr);
            dispatch(fetchFilterDataFailed(xhr));
        });
    };
}
export function fetchReportsData(filter = {}) {
    console.log('Fetch Reports data-filter', filter);

    const actualFilter = {
        hud: filter.hudFilter || 'Tirunelveli',
        block: filter.blockFilter,
        date: filter.dateFilter || getTime().format('DD.MM.YYYY')
    };
    console.log('fetch report data', JSON.stringify(actualFilter));
    return dispatch => {
        dispatch(fetchFilterData());
        dispatch(fetchATPData(filter));
        dispatch(fetchData());
        $.ajax({
            url: '/api/report',
            data: actualFilter,
            headers: {'x-access-token': Auth.getToken()}
        })
        .done(function(response) {
            if(response && response.message === 'Failed to authenticate token.') {
                Auth.deauthenticateUser();
                browserHistory.push('/app/login');
            }else{
                dispatch(fetchReportsSuccess(response));
            }
        })
        .fail(function(xhr) {
            console.log(xhr);
            Auth.deauthenticateUser();
            browserHistory.push('/app/login');
            dispatch(fetchReportsFailed(xhr));
        });
    };
}
export function signUpOnSubmit(data) {
    console.log(data);
    return dispatch => {
        dispatch(setSignUpPending(true));
        dispatch(setSignUpSuccess(false));
        dispatch(setSignUpError(null));
        $.ajax({
            type: 'POST',
            url: '/auth/userRegister',
            data: data,
            headers: {'x-access-token': Auth.getToken()}
        })
        .done(function(response) {
            console.log('success', response);
            if(response && response.message === 'Failed to authenticate token.') {
                Auth.deauthenticateUser();
                browserHistory.push('/app/login');
            } else{
                if(response.success) {
                    Auth.authenticateUser(response.token);
                    dispatch(setSignUpSuccess(response));
                }else{
                    console.log('Error', response.errors);
                    dispatch(setSignUpError(response.errors));
                }
            }
        })
        .fail(function(error) {
            console.log('Error ajax', error);
            dispatch(setSignUpError(error));
        });
    };
}


export function loginOnSubmit(data) {
    console.log(data);
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));
        $.ajax({
            type: 'POST',
            url: '/auth/authenticate',
            data: data,
            headers: {'x-access-token': Auth.getToken()}
        })
        .done(function(response) {
            console.log('success', response);
            if(response.success) {
                Auth.authenticateUser(response.token);
                dispatch(setLoginSuccess(response));
                dispatch(fetchFilterData());
                browserHistory.push('/app/');
            }else{
                console.log('Error', response.errors);
                dispatch(setLoginError(response.errors));
            }
        })
        .fail(function(error) {
            console.log('Error ajax', error);
            dispatch(setLoginError(error));
        });
    };
}

export function uploadAtp(file) {
    console.log(file);
    const fd = new FormData();
    fd.append('csvfile', file);
    console.log(fd);
    return dispatch => {
        $.ajax({
            type: 'POST',
            url: '/api/atp/upload',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            data: fd,
            headers: {'x-access-token': Auth.getToken()}
        }).done(function(response) {
            if(response && response.message === 'Failed to authenticate token.') {
                dispatch(uploadFail(true));
                Auth.deauthenticateUser();
                browserHistory.push('/app/login');
            }else{
                console.log('upload successfull');
                dispatch(uploadSuccess(true));
                setTimeout(()=>{
                    dispatch(uploadSuccess(false));
                }, 5000);
            }
        });
    };
}


