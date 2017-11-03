
import React from 'react';
// import MyForm from './form';
import styles from './Login.css';

// bootstrap throws errors but loginForm is functional.
// uncomment it and replace "MyForm" to be use.
import LoginForm from './FormContainer'; // bootstrap errors


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleAuthorized = this.handleAuthorized.bind(this);
  }

  handleAuthorized(data) {
    const { auth } = this.props.routes[0];

    auth.authorized = true;
    auth.userName = data.userFullName;
    auth.token = data.token;

    this.props.router.push('/challenge');
  }

  render() {
    return (
      <div className={styles.loginContainer} >
        <h1>Login</h1>
        <p> sign in to your account</p>
        <LoginForm onSubmit={this.handleAuthorized} />
      </div>
    );
  }
}

Login.propTypes = {
  router: React.PropTypes.object,
  routes: React.PropTypes.array,
};

export default Login;
