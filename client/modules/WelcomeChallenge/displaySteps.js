import React from 'react';
import Circle from 'react-icons/lib/fa/circle-o';

const createIcons = (n) => {
  const icons = [];
  for (let i = 0; i < n; i++) {
    icons.push(<Circle size={50} key={i} />);
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
