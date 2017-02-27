import React, {Component} from 'react';
import NavBar from './navBar.jsx';
import HomePage from './Home/home.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import authentification from './authentification-tools.jsx';

class App extends Component {
    constructor(props) {
    super(props);
  }



  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
     }))
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

export default App;

