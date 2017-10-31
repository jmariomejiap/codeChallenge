import React from 'react';

const ChallengeHeader = ({ numberOfSteps }) => {
  return (
    <nav className="navBar navbar-default">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <a href="/home">CC</a>
          </div>
          <div className="col-sm-6">
            <h3>{numberOfSteps}</h3>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <p>userName</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

ChallengeHeader.propTypes = {
  numberOfSteps: React.PropTypes.number,
};

export default ChallengeHeader;
