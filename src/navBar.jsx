import React, {Component} from 'react';
import Auth from './auth-helper.js';

class NavBar extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state ={
      user : {
        username: "",
        firstName : "",
        lastName : ""
      }
    }
  }

  componentWillMount() {
    this.setUser();
  }

  componentDidMount() {
    this.setUser();
  }

  setUser(){
    console.log("SettingUser");
    let currentUser = Auth.retrieveUser();
    let userToSet = {username : currentUser.username, firstName : currentUser.firstName, lastName : currentUser.lastName}
    this.setState({user : userToSet});
  }

  logout(){
    let noUser = {};
    Auth.saveUser(noUser);
    this.setState(user : {username : "", firstName : "", lastName : ""});
  }

  render() {
    let navContent;
    if (this.state.user.username){
      return (
        <nav>
          <h1>Yoga Buddy</h1>
          <button type="submit" id="logout" onClick = {this.logout.bind(this)}>Logout</button>
          <p>Logged in as {this.state.user.firstName} {this.state.user.lastName}</p>
        </nav>
      );
    } else {
      return (
        <nav>
          <h1>Yoga Buddy</h1>
          <div id="login-input">
            <form>
              <input id="username" type="text"/>
              <input id="password" type="password"/>
              <button type="submit" id="logins">Login</button>
            </form>
          </div>
        </nav>
      );
    }
  }
}





export default NavBar;
