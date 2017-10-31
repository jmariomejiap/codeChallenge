import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './main.css';
import fetchChallengeInfo from './fetchChallenge';

import ChallengeBar from './header';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFsbGVuZ2VBdHRlbXB0SWQiOiI1OWUwMThjMTRmNjNmMzY4NjU2NGI1NTMiLCJjaGFsbGVuZ2VJZCI6IjU5ZTAxOGMxNGY2M2YzNjg2NTY0YjU1MiIsImlhdCI6MTUwOTQyNzE2Nn0.1paJPRrTHRWw1SHrXNryUAyrJAP-XpreeL4iYxVKYMo";

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
    fetchChallengeInfo(token)
      .then((result) => {
        if (result.error) {
          this.setState({
            errors: result.error
          });
          console.log('print state after setting it, ', this.state);
          return;
        }
        this.setState({
          challengeName: result.challengeName,
          challengeDescription: result.challengeDescription,
          numberOfSteps: result.numberOfSteps
        });      
      });
      


    /*
    fetch(`/api/v1/challenge?token=${token}`, {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then(result => {
        console.log('second then, result is = ', result);
        
      .catch((e) => e);
    */  

  }


  render() {
    return (
      <div>
        <ChallengeBar numberOfSteps={this.state.numberOfSteps} />
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
