
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
          cookies.set('numberOfSteps', result.numberOfSteps);          
          cookies.set('challengeName', result.challengeName);
          cookies.set('challengeDescription', result.challengeDescription);

          this.setState({
            challengeName: result.challengeName,
            challengeDescription: result.challengeDescription,
            numberOfSteps: result.numberOfSteps
          });      
        });
    }    
  }


  render() {
    return (
      <div >
        <ChallengeBar numberOfSteps={this.state.numberOfSteps} userName={this.state.userName} />
        <div className={styles.welcome}>
          <h1>Welcome to {this.state.challengeName}</h1>
          <h3>{this.state.challengeDescription}</h3>
          <h3>This challenge is broken up into <br /> small steps</h3>
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
