import React, { Component } from 'react';
import styled from 'styled-components';
import FormField from '../../components/widgets/FormFields/FormFields';

class SignIn extends Component {
  state = {
    registerError: '',
    loading: false,
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateFrom = (element) => {
    console.log('update element form', element);
  }

  render() {
    return (
      <div className="logContainer">
        <form>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => { this.updateFrom(element) }}
          />
        </form>
      </div>
    );
  }
}

export default SignIn;
