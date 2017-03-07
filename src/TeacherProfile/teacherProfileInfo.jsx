import React, {Component} from 'react';
import Auth from "../auth-helper.js";


class TeacherProfileInfo extends Component {


  render() {
    let editingForm;
    // console.log(this.props.teacherId)
    // console.log(Auth.retrieveUser().teacherId)
    // console.log(this.state.teacher.description)
    let edit = this.props.edit;
    if (this.props.teacher.id == Auth.retrieveUser().teacherId){
      let form = <p>{this.props.teacher.description}</p>
      if (edit){
        console.log("edit")
        form = (
          <div>
            <label htmlFor="description">Tell us a bit about yourself and what you will be teaching *</label>
            <textarea name="description" onChange={this.props.handleChange}>{this.props.teacher.description}</textarea>
            <input type="submit" value="Save edits" className="btn btn-default"/>
          </div>
        )
      }
      editingForm = (
        <div className="edit">
          <form className="edit-description" onSubmit={this.props.saveChanges}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.props.editProfile}></span>
            {form}
          </form>
        </div>
      );
    }
    else{
      editingForm = <p>{this.props.teacher.description}</p>
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





