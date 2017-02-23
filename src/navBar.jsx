import React, {Component} from 'react';

class NavBar extends Component {

constructor(props) {
  super(props);
  console.log(this.props);
  this.state = {
    username: "",
    password: ""
 };
}

  render() {
    return (
        <nav>
          <h1>Yoga Buddy</h1>
          <button type="submit" id="logins">Login</button>
          <div id="input">
          <input id="username" type="text"/>
          <input id="password" type="text"/>
          </div>
        </nav>
    );
  }
}





export default NavBar;
