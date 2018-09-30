import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import ATPCalendar from './containers/ATPCalendar';
import Loginpage from './containers/LoginPage';
import Dashboard from './containers/Dashboard';
import Auth from './modules/auth';
import AtpUploadPage from './containers/AtpUploadPage';
import Reports from './containers/ReportsPage';

let rchange = (err, replace) => {
    console.log(err, replace);
    if(!Auth.isUserAuthenticated()) {
        replace('/app/login');
    }
    console.log('Authenticated');
};
let logout = (err, replace) => {
    Auth.deauthenticateUser();
    sessionStorage.setItem('currentUser', '---');
    sessionStorage.setItem('admin', JSON.stringify(false));
    sessionStorage.setItem('access', '--');
    replace('/app/login');
    browserHistory.push('/app/login');
};
export default (
	<Route path="/app/" component={App}>
		<IndexRoute component={Dashboard} onEnter={rchange}/>
		<Route path="/app/atp" component={ATPCalendar} onEnter={rchange} />
		<Route path="/app/login" component={Loginpage} />
		<Route path="/app/logout" onEnter={logout}/>
        <Route path="/app/upload" component={AtpUploadPage} onEnter={rchange} />
        <Route path="/app/reports" component={Reports} onEnter={rchange}/>
	</Route>
);
