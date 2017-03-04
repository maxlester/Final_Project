import React, {Component} from 'react';
const uuidV4 = require('uuid/v4');
var moment = require('moment');


class GivingClass extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS", this.props)
    console.log(this.props.classId)
  }

  deleteClass () {
    let classId = {
    classId: this.props.classId
  }
    console.log("Class id", classId)
      $.ajax({
         url: "http://localhost:8080/class/delete",
         type: 'POST',
         dataType: 'json',
         data: JSON.stringify(classId),
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
    if (students[0] === "null null"){ students = []}
    let studentNumber = students.length;
    let studentsMarkup = students.map((student)=>{
      let id = uuidV4();
      return <li key = {id}>{student}</li>
    })
    return (
      <article className = "class clearfix">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <a href = {this.props.classLink}>Access at {this.props.classLink}</a>
          <p><strong>{studentNumber}</strong> students registered</p>
          <ul>
            {studentsMarkup}
          </ul>
        </div>
        <div className="class-date">
          <span className="month">{`${moment(this.props.classDate).format('MMMM Do YYYY, h:mm a')}`}</span>
        </div>
        <button onClick={this.deleteClass.bind(this)} type="button">Delete</button>
      </article>
    );
  }
}

export default GivingClass;
