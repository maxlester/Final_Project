import React, {Component} from 'react';
import Auth from '../auth-helper.js';

class NewClass extends Component {
  constructor(props) {
    super(props);
    let teacherForm = this.props.teacherForm;
    this.state = {
      errors:{},
      newClass:{
        classTitle:"",
        classDescription:"",
        startTime:"",
        cost:"",
        maxNumberOfStudents: "",
      }
    }
  }


  render() {
    return(
       <form className="newClass" onSubmit={this.props.addClass}>
        <input className="classTitle" name="classTitle" type= "text" placeholder="Class Title" onChange={this.props.changeClass}/>
        <textarea className="classDescription" name="classDescription" type= "text" placeholder="Description" onChange={this.props.changeClass}></textarea>
        <input className="cost" name="cost" type= "number" placeholder="Cost" onChange={this.props.changeClass}/>
        <label>Maximum number of students</label>
        <select className="maxNumberOfStudents" name="maxNumberOfStudents" type= "number" onChange={this.props.changeClass}>
          <option value = "1">1</option>
          <option value = "2">2</option>
          <option value = "3">3</option>
          <option value = "4">4</option>
          <option value = "5">5</option>
          <option value = "6">6</option>
        </select>
        <input name = "startTime" type="datetime-local" placeholder="What time do you need to leave?" onChange={this.props.changeClass}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default NewClass;
