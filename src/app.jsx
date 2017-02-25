import React, {Component} from 'react';
import NavBar from './navBar.jsx';
import HomePage from './Home/home.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import authentification from './authentification-tools.jsx';


class App extends Component {
    constructor(props) {
    super(props);
  }

  registerUser(firstName, lastName, username, password, email){
    let userInfo = {
      password : password,
      email : email,
      username : username,
      firstName : firstName,
      lastName : lastName
    }
    $.ajax({
      url: this.dataServer + "/users/new",
      type: 'POST',
      data: {userInfo},
      success: function(data) {
        this.postLogin(data);
        //set the state with the newly loaded data so the display will update
      //   this.setState({currentUser: data.currentUser, classesTaking: data.classesTaking, classesGiving : data.classesGiving});
      // }.bind(this),
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
        registerUser : this.registerUser.bind(this)
     }))
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

export default App;

