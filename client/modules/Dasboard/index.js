
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

const Editor = (props) => {
  if (typeof window !== 'undefined') {
    const Ace = require('react-ace').default;
    require('brace/mode/javascript');
    require('brace/theme/monokai');
    return <Ace {...props} />;
  }
  return null;
};


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const cookie = cookieValidator();
    const h = typeof window !== 'undefined' ? window.innerHeight : 400;
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
      currentStep: parseInt(cookie.challengeStepId, 10),
      editorHeight: this.getEditorHeight(h),
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitions = this.handleSubmitions.bind(this);
    this.getNextStep = this.getNextStep.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getEditorHeight = this.getEditorHeight.bind(this);
  }

  getEditorHeight(h) {
    return h - 65 -180;
  }
  
  updateWindowDimensions() {
    this.setState({
      editorHeight: this.getEditorHeight(window.innerHeight),
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
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
          cookies.set('currentStep', parseInt(result.challengeStepId, 10));

          this.setState({
            stepDescription,
            workArea,
            currentStep: parseInt(result.challengeStepId, 10),
            challengeStepId: result.challengeStepId,
          })
        }
      });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

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
      workArea: e
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
        if (response.sample || response.errorName) {
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
    console.log('render');
    return(
      <div className={styles.dashboard}>
        <ChallengeBar numberOfSteps={this.state.numberOfSteps} current={this.state.currentStep} userName={this.state.userName} />
        <Grid  fluid={true} className={styles.myGrid} >
          <Row className={styles.row}>            
            <Col className={styles.leftDiv} lg={4}>
              <div className={styles.description}>
                <ReactMarkdown source={this.state.stepDescription} />
              </div>
            </Col>
            <Col className={styles.rightDiv} lg={8}>
              <Row style={{height: "100%"}}>
                <Col lg={12} bsClass={{padding: 0}}>
                  <div className={styles.topRight}>                    
                    <div className={styles.buttonSection}>
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
                    </div>                    
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
                    <div  
                      style={{height: this.state.editorHeight}} 
                      className={styles.editorDiv} 
                      >
                      <Editor 
                        style={{height: this.state.editorHeight}} 
                        className={styles.aceEditor}
                        width={"100%"}
                        mode="javascript" 
                        fontSize="22px" 
                        theme="monokai" 
                        value={this.state.workArea} 
                        onChange={this.handleChange} 
                        showPrintMargin={false}
                        />                    
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={styles.bottomRight} lg={12} >
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

