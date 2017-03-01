import React, {Component} from 'react';
import Auth from '../auth-helper.js';
import BecomeTeacherForm from './becomeTeacherForm.jsx';


class BecomeTeacher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      becomeTeacherBtn:false,
      teacherDescription: "",
    }
  }

  getTeacher() {
    let teacherId = this.props.params.teacherId;
     $.ajax({
       url: `http://localhost:8080/teacher/${teacherId}`,
       type: 'GET',
       context: this,
       success: function(data) {
         let teacher = {
          firstName: data.firstName,
          lastName: data.lastName,
          description: data.description,
          id: data.id
         }
         let classes = data.classes
         this.setTeacher(teacher);
         this.setClasses(classes);
       },
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
     })
     return false; //returning false to prevent info showing in url
  }

  showBecomeTeacherForm(e){
    let button = e.target;
    if (this.state.becomeTeacherBtn){
      this.setState({becomeTeacherBtn:false})
    }
    else{
      this.setState({becomeTeacherBtn:true})
    }
  }

  becomeTeacher(e){
    e.preventDefault();
    let userId = this.props.params.id;
    $.ajax({
       url: `http://localhost:8080/users/${userId}/becometeacher`,
       type: 'POST',
       context: this,
       success: function(data) {
         let teacher = {
          firstName: data.firstName,
          lastName: data.lastName,
          description: data.description,
          id: data.id
         }
         let classes = data.classes
         this.setTeacher(teacher);
         this.setClasses(classes);
       },
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
     })
     return false; //returning false to prevent info showing in url
  }

  render() {
    let teacherForm;
    if (this.state.becomeTeacherBtn) teacherForm = <BecomeTeacherForm becomeTeacher = {this.becomeTeacher.bind(this)}/>
    return (
      <div className="become-teacher">
        <button className = "btn btn-default" onClick={this.showBecomeTeacherForm.bind(this)}>Start Teaching Classes</button>
        {teacherForm}
      </div>
    );
  }
}

export default BecomeTeacher;
