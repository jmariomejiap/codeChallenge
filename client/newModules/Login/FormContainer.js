import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import sendParams from './fetchAPI';
import './Login.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessCode: '',
      passCode: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    sendParams(this.state)
      .then(result => {
        if (result.error) {
          alert('Invalid AccessCode and/or PassCode\n try again!');
          this.setState({
            accessCode: '',
            passCode: '',
          });
          return;
        }
        console.log('I got it right!');
        this.props.onSubmit();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="loginContainer">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="accessCode" >
            <ControlLabel>AccessCode:</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.accessCode}
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
LoginForm.propTypes = {
  onSubmit: React.PropTypes.func,
};

export default LoginForm;
