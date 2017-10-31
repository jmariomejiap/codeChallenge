import React from 'react';

const NavHeader = () => {
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
    </div>
  );
};

export default NavHeader;
