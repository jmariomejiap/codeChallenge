import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import sendParams from '../../util/apiValidateUser';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessCode: '',
      passCode: '',
      invalid: false,
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
          this.setState({
            accessCode: '',
            passCode: '',
            invalid: true,
          });
          return;
        }
        this.props.onSubmit(result);
      })
      .catch(err => console.log(err));
  }

  validateCredential() {
    if (this.state.accessCode.length > 0 || this.state.passCode.length > 0) {
      return null;
    }
    if (this.state.invalid) {
      return 'error';
    }
    return null;
  }

  render() {
    return (
      <div >
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="accessCode"
            validationState={this.validateCredential()}
          >
            <ControlLabel>Access Code:</ControlLabel>
            <FormControl
              bsSize="large"
              type="text"
              value={this.state.accessCode}
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="passCode"
            validationState={this.validateCredential()}
          >
            <ControlLabel>Pass Code:</ControlLabel>
            <FormControl
              bsSize="large"
              type="password"
              value={this.state.passCode}
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            type="submit"
          >
          Start
          </Button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func,
};

export default LoginForm;
