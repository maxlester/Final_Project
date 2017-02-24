import React, {Component} from 'react';
import NavBar from './navBar.jsx';
import HomePage from './home.jsx';
import Dashboard from './dashboard.jsx';


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

