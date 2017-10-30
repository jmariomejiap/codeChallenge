import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './main.css';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      numberChaSteps: [],
      challengeName: '',
    }
  }


  render() {
    return (
      <div className={styles.welcome}>
        <h1>Welcome to challenge {this.challengeName}</h1>
        <p>This challenge is broken up into <br /> small steps</p>
        <Button
          className={styles.startButton}
          bsSize="large"
          bsStyle="success"
        >
        Start!
        </Button>
      </div>
    );
  }  
};

export default Welcome;
