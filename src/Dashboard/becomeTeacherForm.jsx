import React, {Component} from 'react';


class BecomeTeacherForm extends Component {

  render() {
    return (
      <form className="become-teacher-form" onSubmit={this.props.becomeTeacher}>
        <label htmlFor="description">Tell us a bit about what yourself to become a teacher</label>
        <textarea name="description" onChange={this.props.handleChange}></textarea>
        <input type="submit"/>
      </form>
    );
  }
}

export default BecomeTeacherForm;
