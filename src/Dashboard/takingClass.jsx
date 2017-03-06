import React, {Component} from 'react';


class TakingClass extends Component {

  render() {

    return (
      <article className = "class taking-class clearfix">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <h5>{this.props.teacherName}</h5>
          <a href = {this.props.classLink}>Access at {this.props.classLink}</a>
        </div>
        <div className="class-date">
          <span className="month">Oct</span>
          <span className="day">12</span>
          <span className="time">7:30 PM</span>
        </div>
      </article>
    );
  }
}

export default TakingClass;
