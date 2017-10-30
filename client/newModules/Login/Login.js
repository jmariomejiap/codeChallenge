
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

  handleAuthorized() {
    this.props.router.push('/dashboard');
  }

  render() {
    return (
      <div className={styles.loginContainer} >
        <h1>THIS IS THE LOGIN PAGE</h1>
        <LoginForm onSubmit={this.handleAuthorized} />
      </div>
    );
  }
}

Login.propTypes = {
  router: React.PropTypes.object,
};

export default Login;
