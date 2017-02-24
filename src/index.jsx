// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute} from 'react-router';
import App from './app.jsx';
import HomePage from './Home/home.jsx';
import Dashboard from './Dashboard/dashboard.jsx';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="dashboard" component={Dashboard}/>
    </Route>
  </Router>
),document.getElementById('react-root'));
