import React, {Component} from 'react';
import NavBar from './navBar.jsx';
import HomePage from './Home/home.jsx';
import Dashboard from './Dashboard/dashboard.jsx';


class App extends Component {
    constructor(props) {
    super(props);
  }
  render() {
    return (
      <Dashboard/>
    );
  }
}

export default App;

