import React, {Component} from 'react';
const uuidV4 = require('uuid/v4');
var moment = require('moment');


class GivingClass extends Component {
  constructor(props) {
    super(props);
  }

  deleteClass () {

    console.log('students')

    let classData = {
    classId: this.props.classId,
    students: this.props.students,
    classTitle: this.props.classTitle
    }
    console.log("class Data:", classData)
      $.ajax({
         url: "http://localhost:8080/class/delete",
         type: 'POST',
         dataType: 'json',
         data: JSON.stringify(classData),
         headers: {
           'Content-Type':'application/json'
          },
          context: this,
         success: function() {
          console.log("class deleted")
         },
         error: function(xhr, status, err) {
           console.error(err.toString());
         }.bind(this)
       })
     return false; //returning false to prevent info showing in url
  }

  render() {
    let students = this.props.students;
    console.log("STUDENTS", students);
    if (students[0] === "null null"){ students = []}
    console.log("THIS IS THE STRING", this.props.classTitle)
    let studentNumber = students.length;
    let studentsMarkup = students.map((student)=>{
      let id = uuidV4();
      return <li key = {id}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span>{student}</li>
    })
    return (
      <article className = "class giving-class clearfix">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <a href = {this.props.classLink}>Access at {this.props.classLink}</a>
          <p><strong>{studentNumber} students registered</strong></p>
          <ul>
            {studentsMarkup}
          </ul>
        </div>
        <div className="class-date">
          <span className="year">{this.props.formatDate(this.props.classDate)[0]}</span>
          <span className="month">{this.props.formatDate(this.props.classDate)[1]}</span>
          <span className="day">{this.props.formatDate(this.props.classDate)[2]}</span>
          <span className="time">{this.props.formatDate(this.props.classDate)[3]}</span>
        </div>
        <div className="class-delete" onClick={this.props.deleteClass} data-class-id={this.props.classId}>
          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
        </div>
      </article>
    );
  }
}

export default GivingClass;
