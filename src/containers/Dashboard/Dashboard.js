import React, { Component } from 'react';
import styled from 'styled-components';
import FormField from '../../components/widgets/FormFields/FormFields';
import { FormButton, FormFieldError, FormTitle } from '../../components/widgets/FormFields/styled';
import { firebaseTeams, firebaseArticles, firebase } from '../../firebase';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import Uploader from '../../components/widgets/FileUploader/fileUploader';

const PostContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100vh;
  padding-top: 50px;
`;

class Dashboard extends Component {
  
  state = {
    editorState: EditorState.createEmpty(),
    postError: '',
    loading: false,
    formdata: {
      author: {
        element: 'input',
        value: '',
        config: {
          name: 'author_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      title: {
        element: 'input',
        value: '',
        config: {
          name: 'title_input',
          type: 'text',
          placeholder: 'Enter the title'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      body: {
        element: 'texteditor',
        value: '',
        valid: true
      },
      image: {
        element: 'image',
        value: '',
        valid: true
      },
      team: {
        element: 'select',
        value: '',
        config: {
          name: 'teams_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateFrom = (element, content = '') => {
    const newFormData = {
      ...this.state.formdata
    };

    const newElement = {
      ...newFormData[element.id]
    }

    if(content === ''){
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    if (element.blur) {
      let validData = this.validate(newElement);
      [newElement.valid, newElement.validationMessage] = validData;
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;
    this.setState({
      formdata: newFormData,
      postError: ''
    });
  }

  validate = (element) => {
    let error = [true, ''];

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  }
  
  submitForm = (event) => {
    event.preventDefault();

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
        postError: '',
        loading: true,
      });

      firebaseArticles
        .orderByChild('id')
        .limitToLast(1).once('value')
        .then(snapshot => {
          let articleId = null;
          snapshot.forEach(child => {
            articleId = child.val().id
          });

          dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
          dataToSubmit['id'] = articleId + 1;
          dataToSubmit['team'] = parseInt(dataToSubmit['team']);

          firebaseArticles.push(dataToSubmit).then(article => {
            this.props.history.push(`articles/${article.key}`);
          }).catch(error => {
            this.setState({
              postError: error.message
            });
          });
        });
    } else {
      console.log('form is not valid');
      this.setState({
        postError: 'Something went wrong'
      });
    }

  }

  submitButton = () => (
    this.state.loading
      ? 'Loading...'
      :
      <div>
        <FormButton onClick={(event) => { this.submitForm(event) }}>
          Add Post
        </FormButton>
      </div>
  );

  showError = () => (
    this.state.postError ?
      <FormFieldError>
        { this.state.postError }
      </FormFieldError> :
      null
  );

  onEditorStateChange = (editorState) => {
    let contentState = editorState.getCurrentContent();
    let rawState = convertToRaw(contentState);
    let html = stateToHTML(contentState);

    this.updateFrom({id: 'body'}, html, false);

    this.setState({
      editorState
    });
  }

  loadTeams = () => {
    firebaseTeams.once('value').then(response => {
      let teams = [];
      response.forEach(child => {
        teams.push({
          id: child.val().teamId,
          name: child.val().city
        })
      })
      const newFormData = {...this.state.formdata};
      const newElement = {...newFormData['team']};
      newElement.config.options = teams.splice(0, 29);
      newElement.value = '0';
      newElement.valid = true;
      newFormData['team'] = {...newElement};
      this.setState({
        formdata: newFormData
      });
    })
  }

  storeFilename = (filename) => {
    this.updateFrom({ id: 'image' }, filename)
  }

  componentDidMount(){
    this.loadTeams();
  }

  render() {
    return (
      <PostContainer>
        <form >
          <FormTitle>Add post</FormTitle>

          <Uploader
            filename={ (filename) => this.storeFilename(filename) }
          />

          <FormField
            id={'author'}
            formdata={this.state.formdata.author}
            change={(element) => {
              this.updateFrom(element)
            }}
          />
          <FormField
            id={'title'}
            formdata={this.state.formdata.title}
            change={(element) => {
              this.updateFrom(element)
            }}
          />

          <Editor
            editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
          />

          <FormField
            id={'team'}
            formdata={this.state.formdata.team}
            change={(element) => {
              this.updateFrom(element)
            }}
          />

          { this.submitButton() }
          { this.showError() }
        </form>
      </PostContainer>
    );
  }
}

export default Dashboard;
