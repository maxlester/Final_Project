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
    this.setState({teacherForm : true})
  }

  removeTeacherForm(){
    console.log("removing teacher form")
    this.setState({teacherForm : false})
  }

  render() {
    return (
      <div className="home">
        <NavBar router={this.props.router}/>
        <aside className="left-sidebar">
        </aside>
        <main>
          <h2>Teach, connect, make a living with your friends</h2>
          <section className="register">
            <button type="button" className="btn btn-default" onClick={this.setTeacherForm.bind(this)}>I want to teach</button>
            <button type="button" className="btn btn-clear" onClick={this.removeTeacherForm.bind(this)}>I want to take classes</button>
            <Register teacherForm={this.state.teacherForm} router={this.props.router}/>
          </section>
        </main>
      </div>
    );
  }
}

export default HomePage;

