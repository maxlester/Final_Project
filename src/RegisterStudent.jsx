import React, {Component} from 'react';

class RegisterStudent extends Component {
  constructor() {
    super();
  }

  render() {
    return(
       <form className="registerStudent">
        <input className="registerStudent-firstName" type= "text" placeholder="First Name"/>
        <input className="registerStudent-lastName" type= "text" placeholder="Last Name"/>
        <input className="registerStudent-username" type= "text" placeholder="User Name"/>
        <input className="registerStudent-email" type= "text" placeholder="Email"/>
        <input className="registerStudent-password" type= "text" placeholder="Password"/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default RegisterStudent;
