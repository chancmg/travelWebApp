class Auth {
    static authenticateUser(token) {
        sessionStorage.setItem('userDetails', token);
    }
    static isUserAuthenticated() {
        return sessionStorage.getItem('userDetails') !== null;
    }
    static deauthenticateUser() {
        sessionStorage.removeItem('userDetails');
    }
    static getToken() {
        return sessionStorage.getItem('userDetails');
    }
 }
export default Auth;
