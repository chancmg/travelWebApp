import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { fetchReportsData } from '../actions';

injectTapEventPlugin();

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} routes={routes} onEnter={store.dispatch(fetchReportsData())}/>
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};