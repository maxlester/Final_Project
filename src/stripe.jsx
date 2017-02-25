import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';

class TakeMoney extends React.Component {
 onToken = (token) => {
   fetch('/save-stripe-token', {
     method: 'POST',
     body: JSON.stringify(token),
   }).then(token => {
     alert(`We are in business, ${token.email}`);
   });
 }

 // ...

 render() {
   return (
     // ...
     <StripeCheckout
       token={this.onToken}
       stripeKey="my_PUBLISHABLE_stripekey"
     />
   )
 }
}

export default TakeMoney;
