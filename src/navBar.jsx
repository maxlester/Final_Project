import React, {Component} from 'react';
import Auth from './auth-helper.js';
import { default as Router, Route } from 'react-router'
import { Navigation } from 'react-router'

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
    };

  }

  componentDidMount() {
        this.setUser();
  }


loginUser(e){
   let logInUser = {
    email : this.state.user.email,
    password : this.state.user.password
   }
   console.log("just anything")
   e.preventDefault();
   $.ajax({
     url: "http://localhost:8080/login",
     type: 'POST',
     dataType: 'json',
     data: JSON.stringify(logInUser),
     headers: {
       'Content-Type':'application/json'
      },
      context: this,
     success: function(data) {
       // let user = JSON.parse(data);
       console.log("LLLLLLLLL", this.props);
       Auth.saveUser(data);
       this.setUser();
       this.props.router.push(`/dashboard/${Auth.retrieveUser().userId}`)
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
      let userToSet = {email: currentUser.email, username : currentUser.username, firstName : currentUser.firstName, lastName : currentUser.lastName, id:currentUser.id, teacherId : currentUser.teacherId}
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
    this.setState({user : user}, ()=>{
    })
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
              <input id="email" name ="email" value={this.state.email} type="email" onChange={this.changeUser.bind(this)}/>
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
