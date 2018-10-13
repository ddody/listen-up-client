import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import reducer from './reducers';
import logger from 'redux-logger'
import App from './containers/App';

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(reducer),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      logger
    )
  )
);

render(
  <Router>
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <App history={history} />
      </ConnectedRouter>
    </Provider>
  </Router>,
  document.getElementById('root')
);

window.onerror = (err) => {
  console.log(err);
}
