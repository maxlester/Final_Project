import React, {Component} from 'react';
import Auth from '../auth-helper.js';

class Register extends Component {
  constructor(props) {
    super(props);
    let teacherForm = this.props.teacherForm;
    this.state = {
      teacherForm :teacherForm,
      errors:{},
      user:{
        firstName:"",
        lastName:"",
        username:"",
        email:"",
        password:""
      }
    }
  }

  // registerUser(e){
  //   let user = this.state.user;
  //   e.preventDefault();
  //   console.log("registerUser", user);
  //   $.ajax({
  //     url: "http://localhost:8080/users/new",
  //     type: 'POST',
  //     data: {user},
  //     success: function(data) {
  //       Auth.saveUser(data);
  //     },
  //     error: function(xhr, status, err) {
  //       console.error(err.toString());
  //     }.bind(this)
  //   })
  //   return false; //returning false to prevent info showing in url
  // }

  //for testing user before joining to server

  registerUser(e){
    let user = this.state.user;
    e.preventDefault();
    let userToStore = {
      username : user.username,
      firstName : user.firstName,
      lastName : user.lastName
    }
    console.log("registerUser", userToStore);
    Auth.saveUser(userToStore);
    return false; //returning false to prevent info showing in url
  }



  changeUser(e){
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({user})
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    let teacherDescription
    if(this.props.teacherForm){
      teacherDescription = <textarea placeholder="Tell us about yourself and what you plan to teach! (you can always edit this later.)"></textarea>
    }
    return(
       <form className="registerStudent" onSubmit={this.registerUser.bind(this)}>
        <input className="firstName" name="firstName" type= "text" placeholder="First Name" onChange={this.changeUser.bind(this)}/>
        <input className="lastName" name="lastName" type= "text" placeholder="Last Name" onChange={this.changeUser.bind(this)}/>
        <input className="username" name="username" type= "text" placeholder="User Name" onChange={this.changeUser.bind(this)}/>
        <input className="email" name="email" type= "email" placeholder="Email" onChange={this.changeUser.bind(this)}/>
        <input className="password" name="password" type= "text" placeholder="Password" onChange={this.changeUser.bind(this)}/>
        {teacherDescription}
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default Register;
