import React from 'react';
import PropTypes from 'prop-types';
// import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'material-ui/TextField'; //eslint-disable-line

const SignUp = ({
  onLoginSubmit, onLoginChange, loginErrors, user,
}) => (
  <div>
    <main className="signin-main">
      <center>
        <div className="section">
          <h1 className="black-text">Travel App Dashboard</h1>
        </div>

        <h5 className="black-text">Please, login into your account</h5>
        <div className="section" />

        <div className="container">
          <div className="z-depth-1 grey lighten-2 row loginbox">
            <form className="col s12" onSubmit={onLoginSubmit}>
              <div className="row">
                <div className="col s12" />
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <TextField
                    floatingLabelText="Username"
                    name="name"
                    errorText={loginErrors && loginErrors.name}
                    onChange={event => onLoginChange(event.target.value, 'userId')}
                    value={user.userId}
                  />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <label htmlFor="password">
                    <input
                      className="validate"
                      type="password"
                      name="password"
                      id="password"
                      onChange={event => onLoginChange(event.target.value, 'rawPassPhrase')}
                      value={user.rawPassPhrase}
                    />
                    Password
                  </label>
                </div>
                <div className="right">
                  <a className="pink-text" href="#!" id="forgot">
                    <b>Forgot Password?</b>
                  </a>
                </div>
              </div>

              <br />
              <center>
                <div className="row">
                  <button
                    type="submit"
                    name="btn_login"
                    className="col s12 btn btn-large waves-effect black"
                    onTouchTap={() => onLoginSubmit()}
                  >
                    Login
                  </button>
                </div>
              </center>
            </form>
          </div>
        </div>
      </center>

      <div className="section">
        {loginErrors && loginErrors.message && (
          <p className="error-message">{loginErrors.message}</p>
        )}
      </div>
      <div className="section" />
    </main>
  </div>
);
SignUp.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  onLoginChange: PropTypes.func.isRequired,
  loginErrors: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    rawPassPhrase: PropTypes.string.isRequired,
  }).isRequired,
};

export default SignUp;
