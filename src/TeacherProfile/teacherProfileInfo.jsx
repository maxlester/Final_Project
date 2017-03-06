import React, {Component} from 'react';


class TeacherProfileInfo extends Component {

  render() {
    return (
      <aside className="left-sidebar">
        <div className="container-sidebar">
          <div className="avatar"></div>
          <h2>{this.props.teacher.firstName} {this.props.teacher.lastName}</h2>
          <p>{this.props.teacher.description}</p>
        </div>
      </aside>
    );
  }
}

export default TeacherProfileInfo;





