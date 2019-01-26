class Auth {
  static authenticateUser(token) {
    localStorage.setItem('currentUser', token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('currentUser') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('currentUser');
  }

  static getToken() {
    return localStorage.getItem('currentUser');
  }
}
export default Auth;
