import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './main.css';
import fetchChallengeInfo from './fetchChallenge';

import ChallengeBar from './header';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFsbGVuZ2VBdHRlbXB0SWQiOiI1OWFmODEwZjkwYzQ4NjNmYWE5YTAyYjkiLCJjaGFsbGVuZ2VJZCI6IjU5YWY4MTBlOTBjNDg2M2ZhYTlhMDJiOCIsImlhdCI6MTUwOTM4OTI3OX0.yMW4uLH9sWefeV6igeqSzFdN2UxvGlHOBgdmekfxBto";

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


    /*
    fetch(`/api/v1/challenge?token=${token}`, {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then(result => {
        console.log('second then, result is = ', result);
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
      })
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
