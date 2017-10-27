import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './Login.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passCode: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    alert(`params = username:${this.state.userName} and passCode:${this.state.passCode}`);
  }

  render() {
    return (
      <div className="loginContainer">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="userName" >
            <ControlLabel>UserName:</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.userName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="passCode" >
            <ControlLabel>PassCode:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.passCode}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            type="submit"
          >
          Login
          </Button>
        </form>
      </div>
    );
  }
}

/*
LoginForm.propTypes = {
  FormGroup: React.PropTypes.function,
  FormControl: React.PropTypes.function
}
*/

export default LoginForm;
