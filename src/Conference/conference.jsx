import React, {Component} from 'react';
import NavBar from '../navBar.jsx';
import ConferenceSideBar from './conferenceSideBar.jsx';
import PreConference from './pre-conference.jsx';


class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startConference : false
    }
  }

  startConference(){
    console.log("conference started")
    this.setState({startConference : true});
  }

  render() {
    if (this.state.startConference){
      return (
        <div className="conference">
          <NavBar/>
          <ConferenceSideBar/>
          <main>
            <div id="presenter-media"></div>
            <div id="remote-media"></div>
            <div id="local-media"></div>
          </main>
        </div>
      );
    }
    else {
      return (<PreConference startConference={this.startConference.bind(this)}/>)
    }
  }
}

export default Conference;
