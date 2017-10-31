import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import DisplaySteps from './displaySteps';

const ChallengeBar = ({ numberOfSteps }) => {
  return (
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/home">Code-Challenge</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <DisplaySteps steps={numberOfSteps} />
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="profile">UserName</NavItem>
      </Nav>
    </Navbar>
  );
};

ChallengeBar.propTypes = {
  numberOfSteps: React.PropTypes.number,
};

export default ChallengeBar;


// working without using bootstrap instances
/*
const ChallengeBar = ({ numberOfSteps }) => {
  return (
    <nav className="navBar navbar-default">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <a href="/home">Code Challenge</a>
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
*/
