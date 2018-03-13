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

    if(element.blur) {
      let validData = this.validate(newElement);
      [newElement.valid, newElement.validationMessage] = validData;
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;
    this.setState({
      formdata: newFormData
    });
  }
  
  validate = (element) => {
    let error = [true, ''];

    if(element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const message = `${!valid ? 'Must be valid email': ''}`;
      error = !valid ? [valid, message] : error;
    }

    if(element.validation.password) {
      const valid = element.value.length >= 5;
      const message = `${!valid ? 'Must be greater than 5 characters': ''}`;
      error = !valid ? [valid, message] : error;
    }

    if(element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required': ''}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
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
