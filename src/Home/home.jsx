import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import Register from './Register.jsx';
import Auth from '../auth-helper.js';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherForm : false
    }
  }

  setTeacherForm(){
    console.log("setting teacher form")
    this.setState({teacherForm : true});
  }

  removeTeacherForm(){
    console.log("removing teacher form")
    this.setState({teacherForm : false});
  }

  redirectToDashboard(){
    let userId = Auth.retrieveUser().userId;
    this.props.router.push(`/dashboard/${userId}`);
  }

  render() {
    let user = Auth.retrieveUser()
    let mainContent;
    if (user){
      mainContent = (
        <section>
          <h2>Welcome, {firstName}</h2>
          <button className="btn btn-clear" id="dashboard" onClick = {this.redirectToDashboard.bind(this)}><span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> Your Dashboard</button>
        </section>
      )
    }
    else{
      mainContent = (
       <section className="register">
          <button type="button" className="btn btn-default" onClick={this.setTeacherForm.bind(this)}>I want to teach</button>
            <button type="button" className="btn btn-clear" onClick={this.removeTeacherForm.bind(this)}>I want to take classes</button>
            <Register teacherForm={this.state.teacherForm} router = {this.props.router}/>
        </section>
      );
    }
    return (
      <div className="home">
        <NavBar router={this.props.router}/>
        <aside className="left-sidebar">
        </aside>
        <main>
          <h2>Teach, connect, make a living with your friends</h2>
          {mainContent}
        </main>
      </div>
    );
  }
}

export default HomePage;

