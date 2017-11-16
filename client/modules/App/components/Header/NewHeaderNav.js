import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import styles from './newHeader.css';

const NavHeader = () => {
  return (
    <Navbar fluid className={styles.navbar}>
      <Navbar.Header>
        <Navbar.Brand>
          <Link className={styles.brandName} to="/" >Code-Challenge</Link>
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
