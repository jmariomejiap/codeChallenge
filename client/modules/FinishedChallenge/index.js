
import React from 'react';
import ChallengeBar from '../App/components/Header/NewHeaderChallenge';
import Cookies from 'universal-cookie';
import cookieValidator from '../../util/checkCookies';
import removeCookies from '../../util/removeCookies';
import styles from '../WelcomeChallenge/main.css';

const Finished = () => {
  const cookie = cookieValidator();
  console.log('this is the cookie load', cookie);


  return (
    <div>
      <ChallengeBar userName={cookie.userName}/>  
      <div className={styles.welcome}>
        <h1>Challenge Completed!</h1>
      </div>
    </div>
  )
};

export default Finished;
