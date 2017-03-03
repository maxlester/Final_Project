import React, {Component} from 'react';
import Auth from '../auth-helper.js';

class Register extends Component {
  constructor(props) {
    super(props);
   let teacherForm = this.props.teacherForm;
    this.state = {
      errors:{},
      user:{
        firstName:"",
        lastName:"",
        username:"",
        email:"",
        password:"",
        teacher : teacherForm,
        description : ""
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.teacherForm !== this.state.user.teacher){
      this.updateTeacherForm();
    }
  }

  updateTeacherForm(){
    let user = this.state.user;
    user.teacher = this.props.teacherForm;
    this.setState({user : user})
  }


  registerUser(e){
      e.preventDefault();
      let user = this.state.user;
       $.ajax({
         url: "http://localhost:8080/users/new",
         type: 'POST',
         dataType: 'json',
         data: JSON.stringify(user),
         headers: {
           'Content-Type':'application/json'
          },
         success: function(data) {
           Auth.saveUser(data);
           let userId = data.userId;
           console.log(data);
           window.location = `/#/dashboard/${userId}`;
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
    this.setState({user})
  }

  render() {
    let teacherDescription
    if(this.props.teacherForm){
      teacherDescription = <textarea name = "description" placeholder="Tell us about yourself and what you plan to teach! (you can always edit this later.)" onChange={this.changeUser.bind(this)}></textarea>
    }
    return(
      <form className="registerStudent" onSubmit={this.registerUser.bind(this)}>
        <input className="firstName" name="firstName" type= "text" placeholder="First Name" onChange={this.changeUser.bind(this)}/>
        <input className="lastName" name="lastName" type= "text" placeholder="Last Name" onChange={this.changeUser.bind(this)}/>
        <input className="username" name="username" type= "text" placeholder="User Name" onChange={this.changeUser.bind(this)}/>
        <input className="email" name="email" type= "email" placeholder="Email" onChange={this.changeUser.bind(this)}/>
        <input className="password" name="password" type= "password" placeholder="Password" onChange={this.changeUser.bind(this)}/>
        {teacherDescription}
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default Register;
