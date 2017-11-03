
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
    console.log(`inside Login props = ${JSON.stringify(this.props)}`);
  }

  handleAuthorized(p) {
    console.log(`passing state from children to login ${JSON.stringify(p)}`);
    console.log(JSON.stringify(this.props.routes));
    console.log(this.props.routes[0].auth);
    this.props.routes[0].auth.authorized = true;
    this.props.routes[0].auth.userName = 'ajaName';
    this.props.routes[0].auth.token = 'niceToken';
    console.log(this.props.routes[0].auth);


    // this.props.router.push('/challenge', p);
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
