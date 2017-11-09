import React from 'react';
import styles from './dashboard.css';
/*
[
  {
    "sample":"true",
    "result":[{"userAnswer":"\nfunction sum(a, b) {\n    return a + b;\n}\n",
    "testInput":[1,2],
    "expectedOutput":3,
    "sample":true,
    "score":true
  },
  {
    "userAnswer": "\nfunction sum(a, b) {\n    return a + b;\n}\n",
    "testInput":[10,2],
    "expectedOutput":12,
    "sample":true,
    "score":true
  },
  {
    "userAnswer":"\nfunction sum(a, b) {\n    return a + b;\n}\n",
    "testInput":[2,2],
    "expectedOutput":4,
    "sample":true,
    "score":true
  }
]

*/

const TestsArea = (props) => {
  if (!props.response.result) {
    return null;
  }
  const result = props.response.result;
  return (
    <div>
      {result.map((o, i) => {
        console.log(o);
        return (
          <div className={styles.testDiv} key={i}>
            <li>TestInput: {`[${o.testInput[0]}, ${o.testInput[1]}]`}</li>
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

/*
class testArea extends React.Component {
  constructor

}
*/
