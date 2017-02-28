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

addClass(e){
   let newClass = this.state.newClass;
   e.preventDefault();
   // let userId = Auth.retrieveUser().userId;
   console.log("Yoooooo", newClass);
   $.ajax({
     url: `http://localhost:8080/dashboard/1/class/new`,
     type: 'POST',
     dataType: 'json',
     data: JSON.stringify(newClass),
     headers: {
       'Content-Type':'application/json'
      },
     success: function(data) {
       // let user = JSON.parse(data);
       console.log("Success", data);
     },
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
   })
   return false; //returning false to prevent info showing in url
 }

  changeClass(e){
    const field = e.target.name;
    const newClass = this.state.newClass;
    newClass[field] = e.target.value;
    this.setState({newClass}, ()=>{
      console.log(this.state.newClass);
    })
  }


  render() {
    return(
       <form className="newClass" onSubmit={this.addClass.bind(this)}>
        <input className="classTitle" name="classTitle" type= "text" placeholder="Class Title" onChange={this.changeClass.bind(this)}/>
        <textarea className="classDescription" name="classDescription" type= "text" placeholder="Description" onChange={this.changeClass.bind(this)}></textarea>
        <input className="cost" name="cost" type= "number" placeholder="Cost" onChange={this.changeClass.bind(this)}/>
        <input className="maxNumberOfStudents:" name="maxNumberOfStudents" type= "number" placeholder="Max Number of students" onChange={this.changeClass.bind(this)}/>
        <input name = "startTime" type="datetime-local" placeholder="What time do you need to leave?" onChange={this.changeClass.bind(this)}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default NewClass;
