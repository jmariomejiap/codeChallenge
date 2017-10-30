import React from 'react';
import sendParams from './fetchAPI';
import './Login.css';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessCode: '',
      passCode: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log('this state =', this.state);
    sendParams(this.state)
      .then(result => {
        console.log('this is the result');
        console.log(result);
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
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="loginContainer">
        <form onSubmit={this.handleSubmit}>
          <label>
            accessCode:<br />
            <input name="accessCode" type="text" value={this.state.accessCode} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            passCode:<br />
            <input name="passCode" type="text" value={this.state.passCode} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

MyForm.propTypes = {
  onSubmit: React.PropTypes.func,
};

export default MyForm;
