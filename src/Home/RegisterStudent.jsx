import React, {Component} from 'react';

class RegisterStudent extends Component {
  constructor() {
    super();
  }

  render() {
    return(
       <form className="registerStudent">
        <input className="firstName" type= "text" placeholder="First Name" onChange={this.handleEmailChange}/>
        <input className="lastName" type= "text" placeholder="Last Name" onChange={this.handleEmailChange}/>
        <input className="username" type= "text" placeholder="User Name" onChange={this.handleEmailChange}/>
        <input className="email" type= "email" placeholder="Email" onChange={this.handleEmailChange}/>
        <input className="password" type= "text" placeholder="Password" onChange={this.handleEmailChange}/>
        <button type="submit" onClick={this.props.registerUser}>Submit</button>
      </form>
    )
  }
}

export default RegisterStudent;
