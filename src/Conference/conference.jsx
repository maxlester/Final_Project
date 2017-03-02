import React, {Component} from 'react';
import PreConference from './pre-conference.jsx';
import ConferenceMain from './conferenceMain.jsx';



class Conference extends Component {
  constructor(props) {
    super(props);
    let classId = this.props.params.classId;
    this.state = {
      startConference : false,
      classId : classId
    }
  }

  startConference(){
    console.log("conference started")
    this.setState({startConference : true})
  }

  getConferenceData(){
    let classId = this.state.classId;
    let authUserId = Auth.retrieveUser().userId
    $.ajax({
      url: `http://localhost:8080/class/${classId}`,
      type: 'GET',
      context: this,
      success: function(data) {
        // let user = JSON.parse(data);
        this.setClassesTaking(data)
      },
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
   })
   return false; //returning false to prevent info showing in url
  }

  render() {
    if (this.state.startConference){
      return (
        <ConferenceMain router={this.props.router} classId = {this.state.classId}/>
      );
    }
    else {
      return (<PreConference startConference={this.startConference.bind(this)} classId = {this.state.classId}/>)
    }
  }
}

export default Conference;
