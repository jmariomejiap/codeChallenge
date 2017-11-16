import React from 'react';
import styles from './dashboard.css';

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
