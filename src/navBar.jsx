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

  redirectHome(){
    this.props.router.push('/');
  }


  loginUser(e){
   let logInUser = {
    email : this.state.user.email,
    password : this.state.user.password
   }
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
    let currentUser = Auth.retrieveUser() || {};
    console.log(currentUser.username);
    let userToSet = {email: currentUser.email, username : currentUser.username, firstName : currentUser.firstName, lastName : currentUser.lastName, id:currentUser.id, teacherId : currentUser.teacherId}
    this.setState({user : userToSet});
    // if (currentUser.username !== "") {
    //   console.log(this.props.router);
    //   this.props.router.push(`/dashboard/${Auth.retrieveUser().userId}`)
    // }
  }

  logout(e){
    let noUser = {
        email: "",
        password: "",
        username: "",
        firstName : "",
        lastName : ""
      };
    e.preventDefault();
    $.ajax({
     url: "http://localhost:8080/logout",
     type: 'POST',
     dataType: 'json',
     data: JSON.stringify(noUser),
     headers: {
       'Content-Type':'application/json'
      },
      context: this,
     success: function(data) {
      console.log("SUCCESS")
      console.log("WWWWWWWWWW",this.props.router)
      Auth.saveUser(data);
      this.setState({user : data});
      this.props.router.push('/');
     },
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
   })
   return false; //returning false to prevent info showing in url
 }


  changeUser(e){
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({user : user}, ()=>{
    })
  }

  redirectToDashboard(){
    let userId = Auth.retrieveUser().userId;
    this.props.router.push(`/dashboard/${userId}`);
  }

  render() {
    let navContent;
    if (this.state.user.username) {
      return (
        <nav>
           <a onClick={this.redirectHome.bind(this)}><h1>Yoga Buddy</h1></a>
          <p>Logged in as {this.state.user.firstName} {this.state.user.lastName}</p>
          <button type="submit" id="logout" className="btn btn-clear" onClick = {this.logout.bind(this)}>Logout</button>
          <button className="btn btn-clear" id="dashboard" onClick = {this.redirectToDashboard.bind(this)}><span className="glyphicon glyphicon-user" aria-hidden="true"></span> My Dashboard</button>
        </nav>
      );
    } else {
      return (
        <nav>
          <a onClick={this.redirectHome.bind(this)}><h1>Yoga Buddy</h1></a>
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
