import React, {Component} from 'react';
import NavBar from './navBar.jsx';
import RegisterStudent from './RegisterStudent.jsx'
import RegisterTeacher from './RegisterTeacher.jsx'


class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="home">
        <NavBar/>
        <aside className="left-sidebar">
        </aside>
        <main>
          <h2>Teach, connect, make a living with your friends</h2>
          <section className="register">
            <button type="button" className="btn btn-default">I want to teach</button>
            <button type="button" className="btn btn-clear">I want to take classes</button>
            <RegisterStudent/>
            <RegisterTeacher/>
          </section>
        </main>
      </div>
    );
  }
}

export default HomePage;
