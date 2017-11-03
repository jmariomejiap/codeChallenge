import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import sendParams from './fetchAPI';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessCode: '',
      passCode: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(`inside LoginForm props = ${JSON.stringify(this.props)}`);
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
        this.props.onSubmit(result);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div >
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

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func,
};

export default LoginForm;
