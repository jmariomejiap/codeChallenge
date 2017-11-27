
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
    this.state = {
      userName: ''
    }
  }

  componentDidMount() {
    const cookie = cookieValidator();
    /*
    // wont work since it will remove all cookies therefore login will be needed.
    if (!cookie.challenge_completed) {
      browserHistory.push('/challenge');
      return;
    }
    */
    this.setState({
      userName: cookie.userName
    })
  }

  componentWillUnmount() {
    removeCookies();
  }
  
  render() {
    return (
      <div>
        <ChallengeBar userName={this.state.userName}/>  
        <div className={styles.welcome}>
          <h1>Challenge Completed!</h1>
        </div>
      </div>
    )
  }
};

export default Finished;
