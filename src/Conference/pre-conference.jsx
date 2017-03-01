import React, {Component} from 'react';


class PreConference extends Component {

  render() {
    return (
      <div className="pre-conference">
        <h2>You are about to join</h2>
        <h3>Yoga</h3>
        <h4>With Bridgit Wald</h4>
        <button className="btn btn-clear" id="button-join" data-class-id="znnt7d" onClick={this.props.startConference}>Join now</button>
      </div>
    );
  }
}

export default PreConference;
