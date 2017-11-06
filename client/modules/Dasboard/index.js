
import React from 'react';
import styles from './dashboard.css';
import { Grid, Row, Col, Button} from 'react-bootstrap';
import fetchChallengeStepInfo from '../../util/fetchChallengeStep';

import ChallengeBar from '../App/components/Header/NewHeaderChallenge';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      stepName: '',
      stepDescription: '',
      workArea: '',
      tests: '',
      numberOfSteps: 0,
    }

  }

  componentDidMount() {
    const { userName, token, numberOfSteps } = this.props.routes[0].auth;
    
    fetchChallengeStepInfo(token)
      .then((result) => {
        if(!result.error) {
          console.log(result);
          this.setState({
            userName,
            numberOfSteps,
            stepDescription: new Buffer(result.description, 'base64').toString(),
            workArea: new Buffer(result.code, 'base64').toString()
          })
        }
      })
  }
  handleChange() {
    /// add changes to state as user types into textearea
  }

  render() {
    return(
      <div>
        <ChallengeBar numberOfSteps={this.state.numberOfSteps} userName={this.state.userName}/>
        <Grid fluid={true} className={styles.myGrid} >
          <Row className={styles.box}>
            
            <Col className={styles.leftDiv} sm={4}>
              <div className={styles.description}>
                <p>
                  {this.state.stepDescription}
                </p>
              </div>
            </Col>
            <Col className={styles.rightDiv} sm={8} >
              <Row style={{height: "70%"}}>
                <Col className={styles.topRight} sm={10}>
                  <div className={styles.workArea} >
                    <textarea className={styles.inputArea} name="workArea" id="wa" value={this.state.workArea} />
                  </div>
                </Col>
                <Col sm={2} className={styles.buttonSection}>
                  <div>
                    <Button 
                      bsSize="large"
                      bsStyle="primary"
                      block
                    >
                    Run
                    </Button>
                    <Button 
                      bsSize="large"
                      bsStyle="primary"
                      block
                    >
                    Submit
                    </Button>
                    <Button 
                      className={styles.startButton}
                      bsSize="large"
                      bsStyle="primary"
                      block
                    >
                    Skip
                    </Button>
                  </div>
                  
                </Col>
              </Row>
              <Row style={{height: "30%"}}>
                <Col className={styles.bottomRight} >
                  <h1>tests Area</h1>
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


/*
// endpoint = /api/v1/challengeStep + token
// example of API response 
{
    "result": "ok",
    "error": "",
    "description": "IyBBbGwgRGlnaXRzIFN1bSBDaGFsbGVuZ2UKCkdpdmVuIGFuIGludGVnZXIsIGZpbmQgdGhlIHN1bSBvZiBhbGwgaXRzIGRpZ2l0cy4KCkV4YW1wbGUKCkZvciBuID0gMTExLCB0aGUgb3V0cHV0IHNob3VsZCBiZQpkaWdpdFN1bShuKSA9IDMuCgoxICsgMSArIDEgPSAzLgoKSW5wdXQvT3V0cHV0CgpbdGltZSBsaW1pdF0gNDAwMG1zIChqcykKW2lucHV0XSBpbnRlZ2VyIG4KCkNvbnN0cmFpbnRzOgowIOKJpCBuIOKJpCAyIMK3IDEwOS4KCltvdXRwdXRdIGludGVnZXI=",
    "code": "CmZ1bmN0aW9uIHN1bShhLCBiKSB7CiAgICByZXR1cm4gYSArIGI7Cn0K"
}
*/