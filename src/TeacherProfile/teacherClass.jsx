import React, {Component} from 'react';
import TakeMoney from './stripe.jsx';


class TeacherClass extends Component {

  render() {
    return (
      <article className = "class clearfix">
        <div className="class-info">
          <h4>{this.props.classTitle}</h4>
          <p>{this.props.classDescription}</p>
        </div>
        <div className="class-date">
          <span className="month">Oct</span>
          <span className="day">12</span>
          <span className="time">7:30 PM</span>
          <span className="cost">$ {this.props.classCost}</span>
          <TakeMoney cost = {this.props.classCost} classId = {this.props.id} classTitle = {this.props.classTitle}/>
        </div>
      </article>
    );
  }
}

export default TeacherClass;



