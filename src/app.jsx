import React, {Component} from 'react';
import NavBar from './navBar.jsx';



class App extends Component {
    constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavBar/>
      </div>
    );
  }
}

export default App;

