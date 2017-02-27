import React, {Component} from 'react';
import Auth from './auth-helper.js';

class NavBar extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      username: "",
      firstName : "",
      lastName : ""
    };
  }

  componentWillMount() {
    this.setUser();
  }

  setUser(){
    console.log("ettingUser");
    let currentUser = Auth.retrieveUser();
    this.setState({username : currentUser.username, firstName : currentUser.firstName, lastName : currentUser.lastName});
  }

  render() {
    return (
        <nav>
          <h1>Yoga Buddy</h1>
          <button type="submit" id="logins">Login</button>
          <% if(this.state.username) {%>
            <p>Logged in as {this.state.firstName} {this.state.lastName}</p>
          <%}else{%>
            <div id="login-input">
              <input id="username" type="text"/>
              <input id="password" type="text"/>
            </div>
          <%}%>
        </nav>
    );
  }
}





export default NavBar;
