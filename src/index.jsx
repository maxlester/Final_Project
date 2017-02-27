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
import Conference from './Conference/conference.jsx';
import TakeMoney from './stripe.jsx';
import TeacherProfile from './TeacherProfile/teacherProfile.jsx';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="dashboard" component={Dashboard}/>
      <Route path="conference" component={Conference}/>
      <Route path="stripe" component={TakeMoney}/>
      <Route name="teacherProfile" path="teacher/:teacherId" component={TeacherProfile} />
    </Route>
  </Router>
),document.getElementById('react-root'));
