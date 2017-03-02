import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import ConferenceSideBar from './conferenceSideBar.jsx';
import Twilio from './twilio.jsx';
import Auth from '../auth-helper.js';

class ConferenceMain extends Component {

  componentDidMount() {
    console.log("mounting conference");
    let classId = this.props.classId;
    let userId = Auth.retrieveUser().userId;
    Twilio.startTwilio(classId, userId);
  }

  render(){
    return(
      <div className="conference">
        <NavBar router={this.props.router}/>
        <ConferenceSideBar/>
        <main>
          <div id="teacher-media"></div>
          <div id="student-media"></div>
        </main>
      </div>
    )
  }
}


export default ConferenceMain;
