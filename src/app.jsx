import React, {Component} from 'react';
import NavBar from './navBar.jsx';
import HomePage from './Home/home.jsx';
import Dashboard from './Dashboard/dashboard.jsx';
import StripeCheckout from 'react-stripe-checkout';
import authentification from './authentification-tools.jsx';
import Auth from './auth-helper.js';

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      user : {
        email: "",
        password: "",
        username: "",
        firstName : "",
        lastName : "",
        userId:"",
        teacherId:""
      }
    }
    this.setUser = ()=>{
      console.log("SettingUser");
      let currentUser = Auth.retrieveUser();
      if (currentUser) {
        let userToSet = {email: currentUser.email, username : currentUser.username, firstName : currentUser.firstName, lastName : currentUser.lastName, id:currentUser.id, teacherId : currentUser.teacherId}
        this.setState({user : userToSet});
      }
    }
  }

  componentDidMount() {
    this.setUser();
  }



  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
        user: this.state.user,
        setUser :this.setUser.bind(this)
      })
    )
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}



export default App;
