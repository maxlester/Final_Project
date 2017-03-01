import React, {Component} from 'react';
import Auth from './auth-helper.js';

class NavBar extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state =  {
      user : {
        email: "",
        password: "",
        username: "",
        firstName : "",
        lastName : ""
      }
    }
  }


loginUser(e){
   let user = this.state.user
   console.log("just anything")
   e.preventDefault();
   $.ajax({
     url: "http://localhost:8080/login",
     type: 'POST',
     dataType: 'json',
     data: JSON.stringify(user),
     headers: {
       'Content-Type':'application/json'
      },
      context: this,
     success: function(data) {
       // let user = JSON.parse(data);
       console.log(data);
       Auth.saveUser(JSON.parse(data));
       this.setUser();

     },
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
   })
   return false; //returning false to prevent info showing in url
 }

  setUser(){
    console.log("SettingUser");
    let currentUser = Auth.retrieveUser();
    if (currentUser) {
      console.log("I've had it up to beer with you")
      let userToSet = {email: currentUser.email, password: currentUser.password, username : currentUser.username, firstName : currentUser.firstName, lastName : currentUser.lastName}
      this.setState({user : userToSet});
    }
  }

  logout(){
    let noUser = {};
    Auth.saveUser(noUser);
    this.setState({user : noUser});
  }

  changeUser(e){
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({user : user})
  }

  render() {
    let navContent;
    if (this.state.user.username) {
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
            <form className="loginUser" onSubmit={this.loginUser.bind(this)}>
              <input id="email" name ="email" value={this.state.email} type="text" onChange={this.changeUser.bind(this)}/>
              <input id="password" name="password" type="password" value={this.state.email} onChange={this.changeUser.bind(this)}/>
              <button type="submit" id="logins">Login</button>
            </form>
          </div>
        </nav>
      );
    }
  }
}





export default NavBar;
