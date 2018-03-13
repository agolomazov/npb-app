import React, { Component } from 'react';
import styled from 'styled-components';
import FormField from '../../components/widgets/FormFields/FormFields';

const LogContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 50px;
  height: 100vh;
`;

const FormTitle = styled.h2`
  font-weight: 300;
  font-size: 35px;
  text-align: center;
`;

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
    const newFormData = {
      ...this.state.formdata
    };

    const newElement = {
      ...newFormData[element.id]
    }

    newElement.value = element.event.target.value;
    newFormData[element.id] = newElement;
    this.setState({
      formdata: newFormData
    });
  }

  render() {
    return (
      <LogContainer>
        <form>
          <FormTitle>Register / Log in</FormTitle>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => { this.updateFrom(element) }}
          />
          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element) => { this.updateFrom(element) }}
          />
        </form>
      </LogContainer>
    );
  }
}

export default SignIn;
