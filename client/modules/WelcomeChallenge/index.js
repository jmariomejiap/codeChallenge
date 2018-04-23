
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Cookies from 'universal-cookie';
import { Button } from 'react-bootstrap';
import styles from './main.css';
import fetchChallengeInfo from '../../util/fetchChallenge';
import cookieValidator from '../../util/checkCookies';
import ChallengeBar from '../App/components/Header/NewHeaderChallenge';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    const cookie = cookieValidator();
    this.state = {
      userName: cookie.userName,      
      challengeName: cookie.challengeName,
      challengeDescription: cookie.challengeDescription,
      numberOfSteps: cookie.numberOfSteps,
      currentStep: cookie.currentStep,
    }
  }
  
  componentDidMount() {
    const cookie = cookieValidator();
    
    if (!cookie.authorized) {
      browserHistory.push('/');
      return;
    }
    if (cookie.challenge_completed) {
      browserHistory.push('/finished');
      return;
    }
    if (!this.state.challengeName) {
      fetchChallengeInfo(cookie.token)
        .then((result) => {
          const cookies = new Cookies();
          const currentStep = (!parseInt(this.state.currentStep)) ? 1 : this.state.currentStep;
          cookies.set('numberOfSteps', result.numberOfSteps);          
          cookies.set('challengeName', result.challengeName);
          cookies.set('challengeDescription', result.challengeDescription);
          cookies.set('currentStep', currentStep);

          this.setState({
            challengeName: result.challengeName,
            challengeDescription: result.challengeDescription,
            numberOfSteps: result.numberOfSteps,
            currentStep: currentStep,
          });      
        });
    }    
  }


  render() {
    return (
      <div >
        <ChallengeBar numberOfSteps={this.state.numberOfSteps} current={this.state.currentStep} userName={this.state.userName} />
        <div className={styles.welcome}>
          <h2>Welcome to {this.state.challengeName}</h2>
          <h4>{this.state.challengeDescription}</h4>
          <h4>This challenge is broken up into <br /> small steps</h4>
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
