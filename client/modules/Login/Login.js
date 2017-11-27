
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
        <LoginForm onSubmit={this.handleAuthorized} />
      </div>
    );
  }
}

export default Login;


/*
1. fix font size challenge page
2. add tabs to tests.
const tabsInstance = (
  <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
    <Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>
    <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
    <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
  </Tabs>
);

ReactDOM.render(tabsInstance, mountNode);
*/
