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
        <NavBar/>
        <ConferenceSideBar/>
        <main>
          <div id="presenter-media"></div>
          <div id="remote-media"></div>
          <div id="local-media"></div>
        </main>
      </div>
    )
  }
}


export default ConferenceMain;
