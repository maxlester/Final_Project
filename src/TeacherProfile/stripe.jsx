import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Auth from '../auth-helper.js';


class TakeMoney extends Component {
    constructor(props) {
    super(props);
    let classId = this.props.classId
    this.state = {
      classId: classId
    }
  }
  onToken(token) {
   fetch('/save-stripe-token', {
     method: 'POST',
     body: JSON.stringify(token),
   }).then(token => {
     alert("Thank you for your purchase!")
    })
  let classRegister = {
    user_id: Auth.retrieveUser().userId,
    class_id: this.state.classId
  }
  let user = Auth.retrieveUser()
  let classes = user.classes || [];
  classes.push(this.state.classId);
  user.classes = classes;
  Auth.saveUser(user);
  console.log("$$$$$$$$$$$$$$$$");
  console.log(this.props);
  console.log("$$$$$$$$$$$$$$$$");
   $.ajax({
     url: `http://localhost:8080/class/${classRegister.class_id}/register`,
     type: 'POST',
     dataType: 'json',
     data: JSON.stringify(classRegister),
     headers: {
       'Content-Type':'application/json'
      },
      context: this,
     success: function() {
      this.props.router.push(`/teacher/${this.props.teacherId}`)
      console.log("User has registered for class");
     },
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
   })
   return false;
  }

 render() {
  let dollarCost = this.props.cost * 100
  console.log(this.props.classTitle);
   return (
     // ...
     <StripeCheckout
      name = {this.props.classTitle}
      image = "https://images.vexels.com/media/users/3/130615/isolated/lists/a26d7ab0bf65ced2518604bc0068fa4e-girl-yoga-practice-silhouette.png"
      amount = {dollarCost}
      label = "Register"
      data-classId = {this.props.id}
      token={this.onToken.bind(this)}
      stripeKey="pk_test_tzcJ5q8ABVzm88a0Ew8Tp6WS"
     />
   )
 }
}


export default TakeMoney;
