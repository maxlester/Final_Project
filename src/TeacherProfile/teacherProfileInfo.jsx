import React, {Component} from 'react';
import Auth from "../auth-helper.js";


class TeacherProfileInfo extends Component {
  constructor(props) {
    super(props);
    let teacher = this.props.teacher;
    console.log("teacher",teacher);
    this.state = {
      edit : false,
      teacher : {
        description : teacher,
        picture : 1,
      }
    }
  }
  editProfile(e){
    console.log("clicked")
    this.setState({edit : true})
  }
  saveChanges(e){
    this.setState({edit : false})
  }
  handleChange(e){
    console.log("changing")
    const field = e.target.name;
    const teacher = this.state.teacher;
    teacher[field] = e.target.value;
    this.setState({teacher:teacher})
  }
  render() {
    let editingForm;
    // console.log(this.props.teacherId)
    // console.log(Auth.retrieveUser().teacherId)
    // console.log(this.state.teacher.description)
    let edit = this.state.edit;
    if (this.props.teacherId == Auth.retrieveUser().teacherId){
      let form;
      if (edit){
        console.log("edit")
        form = (
          <div>
            <label htmlFor="description">Tell us a bit about yourself and what you will be teaching *</label>
            <textarea name="description" onChange={this.handleChange.bind(this)}></textarea>
            <input type="submit" value="Save edits" className="btn btn-default"/>
          </div>
        )
      }
      let editingForm = (
        <div className="edit">
          <form className="edit-description" onSubmit={this.saveChanges.bind(this)}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.editProfile.bind(this)}></span>
            {form}
          </form>
        </div>
      );
    }
    else{
      editingForm = <p>{this.state.teacher.description}</p>
    }
    return (
      <aside className="left-sidebar">
        <div className="container-sidebar">
          <div className="avatar"></div>
          <h2>{this.props.teacher.firstName} {this.props.teacher.lastName}</h2>
          {editingForm}
        </div>
      </aside>
    );
  }
}

export default TeacherProfileInfo;





