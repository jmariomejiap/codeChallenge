
import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactMarkdown from 'react-markdown';
import Cookies from 'universal-cookie';
import styles from './dashboard.css';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import fetchChallengeStepInfo from '../../util/fetchChallengeStep';
import apiDynamicTesting from '../../util/apiDynamicTest';
import cookieValidator from '../../util/checkCookies';
import removeCookies from '../../util/removeCookies';

import ChallengeBar from '../App/components/Header/NewHeaderChallenge';
import TestsArea from './testsArea';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const cookie = cookieValidator();
    this.state = {
      userName: cookie.userName,
      stepName: cookie.stepName,
      stepDescription: cookie.stepDescription,
      workArea: cookie.workArea,
      tests: {},
      numberOfSteps: cookie.numberOfSteps,
      challengeStepId: cookie.challengeStepId,
      token: cookie.token,
      loading: false,
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitions = this.handleSubmitions.bind(this);
    this.getNextStep = this.getNextStep.bind(this);
  }
    
  getNextStep() {
    return fetchChallengeStepInfo(this.state.token)
      .then((result) => {
        if(!result.error) {
          const workArea = new Buffer(result.code, 'base64').toString();
          const stepDescription = new Buffer(result.description, 'base64').toString();

          const cookies = new Cookies();
          cookies.set('stepDescription', stepDescription);
          cookies.set('workArea', workArea);
          cookies.set('challengeStepId', result.challengeStepId);

          this.setState({
            stepDescription,
            workArea,
            challengeStepId: result.challengeStepId,
          })
        }
      });
  }

  componentDidMount() {
    const cookie = cookieValidator();
    
    if (!cookie.authorized) {
      browserHistory.push('/');
      return;
    }
    if (cookie.challenge_completed) {
      browserHistory.push('/finished');
    }
    if (!this.state.challengeStepId) {
      this.getNextStep();
    }    
  }

  handleChange(e) {
    this.setState({
      workArea: e.target.value
    })
  }

  handleSubmitions(e) {
    e.preventDefault();
    
    this.setState({ loading: true });

    const body = {
      token: this.state.token,
      challengeStepId: this.state.challengeStepId,
      input: this.state.workArea,
      sample: e.target.value,
    }
    
    apiDynamicTesting(body)
      .then(response => {
        if (response.sample) {
          this.setState({
            loading: false,
            tests: response,
          });
          return;
        }
        if (response.result === 'ok') {        
          this.setState({
            loading: false,
            tests: '',
          });
          this.getNextStep();
          return;
        }
        if (response.result === 'challenge_completed') {
          const cookies = new Cookies();          
          cookies.set('challenge_completed', true);
          browserHistory.push('/finished');
        }
      });
  }

  render() {
    return(
      <div>
        <ChallengeBar numberOfSteps={this.state.numberOfSteps} userName={this.state.userName}/>
        <Grid fluid={true} className={styles.myGrid} >
          <Row className={styles.box}>            
            <Col className={styles.leftDiv} sm={4}>
              <div className={styles.description}>
                <ReactMarkdown source={this.state.stepDescription} />
              </div>
            </Col>
            <Col className={styles.rightDiv} sm={8} >
              <Row style={{height: "70%"}}>
                <Col className={styles.topRight} sm={10}>
                  <div className={styles.workArea} >
                    <textarea className={styles.inputArea} value={this.state.workArea} onChange={this.handleChange} />
                  </div>
                </Col>
                <Col sm={2} className={styles.buttonSection}>
                  <div>
                    <Modal
                      animation
                      enforceFocus
                      bsSize="small"
                      show={this.state.loading}
                      onHide={this.state.loading}
                      className={styles.loadingModal}
                      >
                      <Modal.Body
                        bsClass={styles.loading}
                      >
                        <h3>Loading...</h3>
                      </Modal.Body>
                    </Modal>
                    <Button 
                      bsSize="large"
                      bsStyle="primary"
                      block
                      value="true"
                      name="run"
                      disabled={this.state.loading}
                      onClick={this.handleSubmitions}
                    >
                    Run
                    </Button>
                    <Button 
                      bsSize="large"
                      bsStyle="primary"
                      block
                      value="false"
                      name="submit"                      
                      disabled={this.state.loading}
                      onClick={this.handleSubmitions}
                    >
                    Submit
                    </Button>
                    <Button 
                      className={styles.startButton}
                      bsSize="large"
                      bsStyle="primary"
                      block
                      disabled
                    >
                    Skip
                    </Button>
                  </div>        
                </Col>
              </Row>
              <Row style={{height: "30%"}}>
                <Col className={styles.bottomRight} >
                  <TestsArea response={this.state.tests} />
                </Col>          
              </Row>              
            </Col>
          </Row>
        </Grid>
      </div>      
    );
  }    
};

export default Dashboard;
