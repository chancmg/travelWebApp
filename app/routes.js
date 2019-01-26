import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Signup from './containers/signup';
import Dashboard from './components/dashboard';
import Home from './containers/home';
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
export default [
  <Route path="/app" component={Dashboard}>
    <IndexRoute component={Home} />
  </Route>,
  <Route path="/app/login" component={Signup} />,
];
