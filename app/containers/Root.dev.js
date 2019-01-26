import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from '../routes';
// import { fetchReportsData } from '../actions';

injectTapEventPlugin();

const Root = (props) => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <div>
        <Router history={history} routes={routes} />
      </div>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.node.isRequired,
  history: PropTypes.node.isRequired,
};

export default Root;
