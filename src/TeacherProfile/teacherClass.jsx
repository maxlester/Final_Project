import React, {Component} from 'react';
import TakeMoney from './stripe.jsx';
var moment = require('moment');
import Auth from '../auth-helper.js';

class TeacherClass extends Component {


  render() {
    let userClasses = Auth.retrieveUser().classes;
    let user = Auth.retrieveUser().userId;
    let teacher = Auth.retrieveUser().teacherId
    let registered = null;
    if (userClasses && userClasses.includes(this.props.id)) {
      registered = <p>You are registered</p>
    } else if (this.props.maxNumberOfStudents <= this.props.numberOfStudents){
      registered = <p>Class is full</p>
    } else if (this.props.teacherId == teacher) {
      registered = <p></p>
    } else {
      registered = <TakeMoney onHandleCount={this.handleCount} maxNumberOfStudents ={this.props.maxNumberOfStudents} cost = {this.props.classCost} classId = {this.props.id} classTitle = {this.props.classTitle} router={this.props.router} teacherId = {this.props.teacherId} />
    }
    return (
      <article className = "class clearfix">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <p>{this.props.classDescription}</p>
        </div>
        <div className="class-date">
       <span className="month">{`${moment(this.props.classDate).format('MMMM Do YYYY, h:mm a')}`}</span>
          <span className="cost">$ {this.props.classCost}</span>

          {registered}
        </div>
      </article>
    );
  }
}

export default TeacherClass;



