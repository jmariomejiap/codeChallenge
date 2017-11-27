import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import styles from './dashboard.css';

const TestsArea = (props) => {
  if (!props.response.result) {
    return null;
  }
  const result = props.response.result;
  return (
    <Tabs>
      {result.map((o, i) => {
        const title = `Test ${i + 1}`;
        return (
          <Tab eventKey={i} title={title}>
            <div className={styles.testDiv}>
              <p>Input: {`a=${o.testInput[0]}, b=${o.testInput[1]}`}</p>
              <p>Output: {o.score.result.toString()}</p>
              <p>ExpectedOutput: {o.expectedOutput}</p>
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
};


TestsArea.propTypes = {
  response: React.PropTypes.object,
};

export default TestsArea;

/*
const TestsArea = (props) => {
  if (!props.response.result) {
    return null;
  }
  const result = props.response.result;
  return (
    <div>
      {result.map((o, i) => {
        return (
          <div className={styles.testDiv} key={i}>
            <li>Input: {`a=${o.testInput[0]}, b=${o.testInput[1]}`}</li>
            <li>ExpectedOutput: {o.expectedOutput}</li>
            <li>Score: {o.score.toString()}</li>
          </div>
        );
      })}
    </div>
  );
};


TestsArea.propTypes = {
  response: React.PropTypes.object,
};

export default TestsArea;

*/
