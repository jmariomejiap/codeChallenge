
import React from 'react';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';
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
    const cookies = new Cookies();
    cookies.set('authorized', 'true');
    cookies.set('token', data.token);
    cookies.set('userName', data.userFullName);

    browserHistory.push('/challenge');
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

export default Login;
