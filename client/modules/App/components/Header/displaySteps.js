import React from 'react';
import Circle from 'react-icons/lib/fa/circle';
import CircleO from 'react-icons/lib/fa/circle-o';
import styles from './newHeader.css';

const createIcons = (n, c) => {
  const currentStep = parseInt(c, 10);
  const icons = [];
  for (let i = 1; i <= n; i++) {
    if (i === currentStep) {
      icons.push(<Circle size={35} key={i} className={styles.stepsIcon} />);
    }
    icons.push(<CircleO size={35} key={i} className={styles.stepsIcon} />);
  }
  return icons;
};

const DisplaySteps = ({ steps, current }) => {
  return (
    <ul>
      {createIcons(steps, current)}
    </ul>
  );
};

DisplaySteps.propTypes = {
  steps: React.PropTypes.number,
  current: React.PropTypes.number,
};

export default DisplaySteps;
