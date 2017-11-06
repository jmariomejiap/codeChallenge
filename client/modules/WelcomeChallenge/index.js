
import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import styles from './main.css';
import fetchChallengeInfo from '../../util/fetchChallenge';

import ChallengeBar from '../App/components/Header/NewHeaderChallenge';

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
        // dashboard needs to display header with... name of challengeStep, number of steps, name, time.
        this.props.routes[0] .auth.numberOfSteps = result.numberOfSteps;

        console.log(`challenge data = ${JSON.stringify(result)}`);
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
          <Link to='/dashboard'>
            <Button
              className={styles.startButton}
              bsSize="large"
              bsStyle="success"
            >
            Start!
            </Button>
          </Link>
          
        </div>
      </div>     
    );
  }  
};

export default Welcome;
