import React, {Component} from 'react';
import NavBar from './navBar.jsx';
import RegisterStudent from './RegisterStudent.jsx'
import RegisterTeacher from './RegisterTeacher.jsx'


class App extends Component {
    constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavBar/>
          <span>
            <strong>Teacher:</strong>
            <RegisterTeacher/>
          </span>
          <span>
            <strong>Student:</strong>
            <RegisterStudent/>
          </span>
      </div>
    );
  }
}

export default App;

