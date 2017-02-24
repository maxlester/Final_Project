import React, {Component} from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    let teacherForm = this.props.teacherForm
    this.state = {
      teacherForm :teacherForm
    }
    console.log("constructing")
  }

  registerUser(e){
    let userInfo = {
      password : this.state.password,
      email : this.state.email,
      username : this.state.username,
      firstName : this.state.firstName,
      lastName : this.state.lastName
    }
    $.ajax({
      url: this.dataServer + "/users/new",
      type: 'POST',
      data: {userInfo},
      success: function(data) {
        //set the state with the newly loaded data so the display will update
      //   this.setState({currentUser: data.currentUser, classesTaking: data.classesTaking, classesGiving : data.classesGiving});
      // }.bind(this),
        console.log(data)
        console.log("seafoam graan")
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleUsernameChange(e){
    this.setState({username: e.target.value});
  }
  handleEmailChange(e){
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  handleFirstNameChange(e){
    this.setState({firstName: e.target.value});
  }
  handleLastNameChange (e){
    this.setState({lastName: e.target.value});
  }

  render() {
    let teacherDescription
    if(this.props.teacherForm){
      teacherDescription = <textarea placeholder="Tell us about yourself and what you plan to teach! (you can always edit this later.)"></textarea>
    }
    return(
       <form className="registerStudent" onSubmit={this.registerUser}>
        <input className="firstName" type= "text" placeholder="First Name" onChange={this.handleFirstNameChange}/>
        <input className="lastName" type= "text" placeholder="Last Name" onChange={this.handleLastNameChange}/>
        <input className="username" type= "text" placeholder="User Name" onChange={this.handleUsernameChange}/>
        <input className="email" type= "email" placeholder="Email" onChange={this.handleEmailChange}/>
        <input className="password" type= "text" placeholder="Password" onChange={this.handlePasswordChange}/>
        {teacherDescription}
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default Register;
