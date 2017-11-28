import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import FaCheck from 'react-icons/lib/fa/check';
import FaBan from 'react-icons/lib/fa/ban';
import styles from './dashboard.css';

const TestsArea = (props) => {
  if (!props.response.result) {
    return null;
  }
  const result = props.response.result;
  return (
    <Tabs>
      {result.map((o, i) => {
        const output = o.score.result;
        const expectedOutput = o.expectedOutput;
        const title = <span>Test {i + 1} {(output === expectedOutput) ? <FaCheck className={styles.successIcon} /> : <FaBan className={styles.errorIcon} />} </span>;
        return (
          <Tab eventKey={i} title={title}>
            <div className={styles.testDiv}>
              <p>Input: {`a= ${o.testInput[0]}, b= ${o.testInput[1]}`}</p>
              <p>Output: {output}</p>
              <p>ExpectedOutput: {expectedOutput}</p>
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
