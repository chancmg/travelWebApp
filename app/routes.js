import React from 'react';
import {
    Route
} from 'react-router';
import Signup from './containers/signup';
// import Auth from './modules/auth';

// let rchange = (err, replace) => {
//     console.log(err, replace);
//     if(!Auth.isUserAuthenticated()) {
//         replace('/app/login');
//     }
//     console.log('Authenticated');
// };
// let logout = (err, replace) => {
//     Auth.deauthenticateUser();
//     sessionStorage.setItem('currentUser', '---');
//     sessionStorage.setItem('admin', JSON.stringify(false));
//     sessionStorage.setItem('access', '--');
//     replace('/app/login');
//     browserHistory.push('/app/login');
// };
export default ( <
    Route path = "/app/signup"
    component = {
        Signup
    } > {
        /* <IndexRoute component={Dashboard} onEnter={rchange}/>
        		<Route path="/app/atp" component={ATPCalendar} onEnter={rchange} />
        		<Route path="/app/login" component={Loginpage} />
        		<Route path="/app/logout" onEnter={logout}/>
                <Route path="/app/upload" component={AtpUploadPage} onEnter={rchange} />
                <Route path="/app/reports" component={Reports} onEnter={rchange}/> */
    } <
    /Route>
);
