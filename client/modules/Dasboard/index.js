
import React from 'react';
import styles from './dashboard.css';
import { Grid, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  return(
    <div style={{backgroundColor: "white"}} >
      <Grid fluid={true}>
        <Row className={styles.box}>
          
          <Col className={styles.leftDiv} sm={4}>
            <h1>Challenge Description</h1>
          </Col>
          <Col className={styles.rightDiv} sm={8} >
            <Row style={{height: "70%"}}>
              <Col className={styles.topRight} >
                <h1>Input Area</h1>
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
};

export default Dashboard;
