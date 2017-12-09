import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import FaCheck from 'react-icons/lib/fa/check';
import FaBan from 'react-icons/lib/fa/ban';
import styles from './dashboard.css';

const ShowError = (props) => {
  const title = <span>Test Error {<FaBan className={styles.errorIcon} />} </span>;
  return (
    <Tabs>
      <Tab title={title} >
        <div className={styles.testDivError}>
          <p>Error: {props.err.errorName}</p>
          <p>Message: {props.err.errorMessage}</p>
        </div>
      </Tab>
    </Tabs>
  );
};

const CreateTabs = (props) => {
  const result = props.result;
  return (
    <Tabs className={styles.tabs} >
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

const TestsArea = (props) => {
  if (!props.response.result) {
    return null;
  }

  const response = props.response;
  return (
    <div>
      {(response.result[0].score.errorName) ?
        <ShowError err={response.result[0].score} /> :
        <CreateTabs result={response.result} />
      }
    </div>
  );
};

ShowError.propTypes = {
  answer: React.PropTypes.string,
  err: React.PropTypes.object,
};

CreateTabs.propTypes = {
  result: React.PropTypes.object,
};

TestsArea.propTypes = {
  response: React.PropTypes.object,
};

export default TestsArea;
