import React from 'react';
import './NewMain.css';

const Main = (props) => {
  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/home">Code Challenge</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="login">Login <span className="sr-only">(current)</span></a></li>
              <li><a href="signup">SignUp</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container" >
        {props.children}
      </div>
    </div>
  );
};

Main.propTypes = {
  children: React.PropTypes.object,
  // children: React.PropTypes.element,
  // children: React.PropTypes.node,
};

export default Main;

/*
// lint error = component should be written as pure function
class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="bigDiv" >
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Code Challenge</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="login">Login <span className="sr-only">(current)</span></a></li>
                <li><a href="signup">SignUp</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
};

// Main.propTypes = {
//  children: React.PropTypes.node,
// };

export default Main;
*/
