import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUp from '../components/signup';
import { travelOnLogin, loginOnChange } from '../actions';

const SignupPage = ({ onLoginSubmit, onLoginChange, travelStore }) => (
  <SignUp
    onLoginSubmit={() => onLoginSubmit(travelStore.user)}
    onLoginChange={onLoginChange}
    loginErrors={travelStore.loginErrors}
    user={travelStore.user}
  />
);

SignupPage.propTypes = {
  travelStore: PropTypes.node.isRequired,
  onLoginChange: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  travelStore: state.travelStore,
});

const mapDispatchToProps = dispatch => ({
  onLoginChange: (value, key) => dispatch(loginOnChange(value, key)),
  onLoginSubmit: data => dispatch(travelOnLogin(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupPage);
