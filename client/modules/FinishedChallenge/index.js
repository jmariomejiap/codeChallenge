
import React from 'react';
import ChallengeBar from '../App/components/Header/NewHeaderChallenge';

const Finished = (props) => {
  const { userName } = props.routes[0].auth;

  return (
    <div>
      <ChallengeBar userName={userName}/>      
      <h1 style={{ color: 'white' }}>Challenge Completed!</h1>
    </div>
  )
};

Finished.propTypes = {
  auth: React.PropTypes.object,
};

export default Finished;
