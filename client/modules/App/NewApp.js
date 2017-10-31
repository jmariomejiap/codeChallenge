import React from 'react';
// import './NewMain.css';
import NavHeader from './components/Header/NewHeaderNav';

const App = (props) => {
  return (
    <div>
      {(props.location.pathname !== '/challenge') ?
        <NavHeader /> : null
      }
      <div className="container" >
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default App;
