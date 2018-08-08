import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {createStore, applyMiddleware, compose} from 'redux';
import persistState from 'redux-localstorage'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import allReducers from './reducers';
import './index.css';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, composeEnhancers(
  applyMiddleware(thunk),
  persistState('loggedIn'),
));

ReactDOM.render(
		<Provider store={store}>
			<Router history={history}>
				<App/>
			</Router>
		</Provider>, document.getElementById('root')
);

registerServiceWorker();