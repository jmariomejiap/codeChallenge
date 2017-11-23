import React from 'react';
import { Link } from 'react-router';
import { Navbar } from 'react-bootstrap';
import styles from './newHeader.css';

const NavHeader = () => {
  return (
    <Navbar fluid className={styles.navbar}>
      <Navbar.Header>
        <Navbar.Brand>
          <Link className={styles.brandName} to="/" >Code-Challenge</Link>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
};

export default NavHeader;
