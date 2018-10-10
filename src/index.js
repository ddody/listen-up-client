import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './component/App';
import ErrorBoundary from './component/ErrorBoundary';

render(
  <Router>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Router>,
  document.getElementById('root')
);

