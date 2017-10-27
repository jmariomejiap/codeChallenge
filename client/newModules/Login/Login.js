
import React from 'react';
// import LoginForm from './FormContainer'; bootstrap errors
import MyForm from './form';

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
      <div>
        <h1>THIS IS THE LOGIN PAGE</h1>
        <MyForm onSubmit={this.handleAuthorized} />
      </div>
    );
  }
}

Login.propTypes = {
  router: React.PropTypes.function,
};

export default Login;
