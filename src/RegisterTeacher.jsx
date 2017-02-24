import React, {Component} from 'react';

class RegisterTeacher extends Component {
  constructor() {
    super();
  }

  render() {
    return(
       <form className="registerTeacher">
        <input className="registerTeacher-firstName" type= "text" placeholder="First Name"/>
        <input className="registerTeacher-lastName" type= "text" placeholder="Last Name"/>
        <input className="registerTeacher-username" type= "text" placeholder="User Name"/>
        <input className="registerTeacher-email" type= "text" placeholder="Email"/>
        <input className="registerTeacher-password" type= "text" placeholder="Password"/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default RegisterTeacher;
