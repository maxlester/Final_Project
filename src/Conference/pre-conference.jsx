import React, {Component} from 'react';


class PreConference extends Component {

  render() {
    let userId = this.props.currentUser.userId;
    let students = this.props.classInfo.students;
    let isRegistered = false;
    console.log("userId", userId);
    console.log("student", students);
    // for (student of students){
    //   if (student.user_id === userId){
    //     isRegistered = true;
    //   }
    // }
    if (isRegistered){
      return (
        <div className="pre-conference">
          <h2>You are about to join</h2>
          <h3>{this.props.classInfo.className}</h3>
          <h4>With {this.props.classInfo.teacherFirstName} {this.props.classInfo.teacherLastName}</h4>
          <button className="btn btn-clear" id="button-join" data-class-id={this.props.classId} onClick={this.props.startConference}>Join now</button>
        </div>
      );
    }
    else {
      return (
        <div className="pre-conference">
          <h2>You are not registered</h2>
          <h3>visit </h3>
          <h4>With {this.props.classInfo.teacherFirstName} {this.props.classInfo.teacherLastName}</h4>
          <button className="btn btn-clear" id="button-join" data-class-id={this.props.classId} onClick={this.props.startConference}>Join now</button>
        </div>
      );
    }
  }
}

export default PreConference;
