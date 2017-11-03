
import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './main.css';
import fetchChallengeInfo from './fetchChallenge';

import ChallengeBar from './header';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',      
      challengeName: '',
      challengeDescription: '',
      numberOfSteps: 0,
      errors: [],
    }
  }
  
  componentDidMount() {
    const { userName, token } = this.props.routes[0].auth;

    fetchChallengeInfo(token)
      .then((result) => {
        if (result.error) {
          this.setState({
            errors: result.error
          });
          return;
        }
        this.setState({
          userName: userName,
          challengeName: result.challengeName,
          challengeDescription: result.challengeDescription,
          numberOfSteps: result.numberOfSteps
        });      
      });
  }


  render() {
    return (
      <div >
        <ChallengeBar numberOfSteps={this.state.numberOfSteps} userName={this.state.userName} />
        <div className={styles.welcome}>
          <h1>Welcome to {this.state.challengeName}</h1>
          <h4>{this.state.challengeDescription}</h4>
          <p>This challenge is broken up into <br /> small steps</p>
          <Button
            className={styles.startButton}
            bsSize="large"
            bsStyle="success"
          >
          Start!
          </Button>
        </div>
      </div>     
    );
  }  
};

export default Welcome;
