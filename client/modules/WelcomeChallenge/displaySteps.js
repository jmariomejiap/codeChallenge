import React from 'react';
// import Circle from 'react-icons/lib/fa/circle-thin';
import Circle from 'react-icons/lib/fa/circle';
import styles from './main.css';

const createIcons = (n) => {
  const icons = [];
  for (let i = 0; i < n; i++) {
    icons.push(<Circle size={45} key={i} className={styles.stepsIcon} />);
  }
  return icons;
};

const DisplaySteps = ({ steps }) => {
  return (
    <ul>
      {createIcons(steps)}
    </ul>
  );
};

DisplaySteps.propTypes = {
  steps: React.PropTypes.number,
};

export default DisplaySteps;
