import React from 'react';
import NavHeader from './components/Header/NewHeaderNav';
import styles from './components/Header/newHeader.css';

const App = (props) => {
  return (
    <div className={styles.container}>
      {(props.location.pathname === '/') ?
        <NavHeader /> : null
      }
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default App;
