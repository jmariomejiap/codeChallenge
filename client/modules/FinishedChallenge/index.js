
import React from 'react';
import { Router, browserHistory } from 'react-router';
import ChallengeBar from '../App/components/Header/NewHeaderChallenge';
import Cookies from 'universal-cookie';
import cookieValidator from '../../util/checkCookies';
import removeCookies from '../../util/removeCookies';
import styles from '../WelcomeChallenge/main.css';

class Finished extends React.Component {
  constructor(props) {
    super(props);  
    const cookie = cookieValidator();
    this.state = {
      userName: cookie.userName,
      authorized:cookie.challenge_completed 
    }
  }

  componentDidMount() {
    if (!this.state.authorized) {
      browserHistory.push('/challenge');
      return;
    }
    removeCookies();
  }

  render() {
    return (
      <div>
        {(!this.state.authorized) ? null :
          <div> 
            <ChallengeBar userName={this.state.userName}/>  
            <div className={styles.welcome}>
              <h1>Challenge Completed!</h1>
            </div>
          </div>
        }        
      </div>
    )
  }
};

export default Finished;
