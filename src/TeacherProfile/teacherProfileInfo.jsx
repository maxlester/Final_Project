import React, {Component} from 'react';


class TeacherProfileInfo extends Component {

  render() {
    return (
      <aside className="left-sidebar">
        <h2>{this.props.teacher.firstName} {this.props.teacher.lastName}</h2>
        <p>{this.props.teacher.description}</p>
      </aside>
    );
  }
}

export default TeacherProfileInfo;





