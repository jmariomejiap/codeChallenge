import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import DisplaySteps from './displaySteps';
import styles from './main.css';

const ChallengeBar = ({ numberOfSteps }) => {
  return (
    <Navbar fluid className={styles.navbar}>
      <Navbar.Header>
        <Navbar.Brand>
          <a className={styles.brandName} href="/home">Code-Challenge</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <DisplaySteps steps={numberOfSteps} />
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="profile">UserName</NavItem>
        </Nav>
      </Navbar.Collapse>
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
