import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';


class TakeMoney extends React.Component {
 onToken = (token) => {
   fetch('/save-stripe-token', {
     method: 'POST',
     body: JSON.stringify(token),
   }).then(token => {
     alert("Thank you for your purchase!");
   });
 }

 // ...

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
      token={this.onToken}
      stripeKey="pk_test_tzcJ5q8ABVzm88a0Ew8Tp6WS"
     />
   )
 }
}

export default TakeMoney;
