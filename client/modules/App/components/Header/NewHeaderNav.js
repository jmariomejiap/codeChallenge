import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import styles from './newHeader.css';

const NavHeader = () => {
  return (
    <Navbar fluid className={styles.navbar}>
      <Navbar.Header>
        <Navbar.Brand>
          <a className={styles.brandName} href="/home">Code-Challenge</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="login">Login</NavItem>
          <NavItem eventKey={2} href="signup">SignUp</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavHeader;
