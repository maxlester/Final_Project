import React, {Component} from 'react';
import NavBar from './navBar.jsx';


class Dashboard extends Component {
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
            <a className="register-btn filled-button">I want to teach</a>
            <a className="register-btn clear-button">I want to <br/> take classes</a>
          </section>
        </main>
      </div>
    );
  }
}

export default Dashboard;
