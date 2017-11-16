import React from 'react';
import NavHeader from './components/Header/NewHeaderNav';


const App = (props) => {
  return (
    <div >
      {(['/', '/login'].includes(props.location.pathname)) ?
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
