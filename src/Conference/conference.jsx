import React, {Component} from 'react';
import PreConference from './pre-conference.jsx';
import ConferenceMain from './conferenceMain.jsx';



class Conference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startConference : false
    }
  }

  startConference(){
    console.log("conference started")
    this.setState({startConference : true})
  }

  render() {
    if (this.state.startConference){
      return (
        <ConferenceMain classId = {this.props.params.classId}/>
      );
    }
    else {
      return (<PreConference startConference={this.startConference.bind(this)} classId = {this.props.params.classId}/>)
    }
  }
}

export default Conference;
