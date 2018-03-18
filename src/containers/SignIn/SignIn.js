import React, {Component} from 'react';
import styled from 'styled-components';
import FormField from '../../components/widgets/FormFields/FormFields';
import { FormButton, FormFieldError, FormTitle } from '../../components/widgets/FormFields/styled';
import { firebase } from '../../firebase';

const LogContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 50px;
  height: 100vh;
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

    if (element.blur) {
      let validData = this.validate(newElement);
      [newElement.valid, newElement.validationMessage] = validData;
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;
    this.setState({
      formdata: newFormData,
      registerError: ''
    });
  }

  validate = (element) => {
    let error = [true, ''];

    if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const message = `${!valid ? 'Must be valid email' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.password) {
      const valid = element.value.length >= 5;
      const message = `${!valid ? 'Must be greater than 5 characters' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  }

  submitForm = (event, type) => {
    event.preventDefault();
    if(type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for(let key in this.state.formdata) {
        dataToSubmit[key] = this.state.formdata[key].value;
      }

      for(let key in this.state.formdata) {
        formIsValid = this.state.formdata[key].valid && formIsValid;
      }
      
      if(formIsValid) {
        this.setState({
          loading: true,
          registerError: ''
        });
        
        if(type) {
          firebase.auth().signInWithEmailAndPassword(
            dataToSubmit.email,
            dataToSubmit.password
          ).then(() => {
            this.props.history.push('/');
          }).catch(error => {
            this.setState({
              loading: false,
              registerError: error.message
            });
          });
        } else {
          firebase.auth().createUserWithEmailAndPassword(
            dataToSubmit.email,
            dataToSubmit.password
          ).then(() => {
            this.props.history.push('/');
          }).catch(error => {
            this.setState({
              loading: false,
              registerError: error.message
            });
          });
        }
      }
    }
  }

  submitButton = () => (
    this.state.loading
      ? 'Loading...'
      :
      <div>
        <FormButton onClick={(event) => { this.submitForm(event, false) }}>Register now</FormButton>{' '}
        <FormButton onClick={(event) => { this.submitForm(event, true) }}>Log in</FormButton>
      </div>
  );

  showError = () => (
    this.state.registerError ?
      <FormFieldError>
        { this.state.registerError }
      </FormFieldError> :
      null
  );

  render() {
    return (
      <LogContainer>
        <form onSubmit={(event) => { this.submitForm(event, null) }}>
          <FormTitle>Register / Log in</FormTitle>
          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => {
              this.updateFrom(element)
            }}
          />
          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element) => {
              this.updateFrom(element)
            }}
          />
          { this.submitButton() }
          { this.showError() }
        </form>
      </LogContainer>
    );
  }
}

export default SignIn;
