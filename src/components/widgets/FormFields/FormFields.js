import React from 'react';
import styled from 'styled-components';

const FormFieldWrapper = styled.div`
  margin: 10px 0 0;
`;

const InputField = styled.input`
  font-size: 17px;
  width: 100%;
  padding: 12px 10px;
  box-sizing: border-box;
  font-weight: 300;
`;

const FormFieldError = styled.div`
  color: #ff5722;
  font-weight: 500;
  margin-top: 5px;
  padding: 5px;
`;

const FormField = ({ formdata, change, id }) => {
  const showError = () => {
    let errorMessage = null;

    if(formdata.validation && !formdata.valid && formdata.touched) {
      errorMessage = (
        <FormFieldError>
          { formdata.validationMessage }
        </FormFieldError>
      );
    }

    return errorMessage;
  }

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <FormFieldWrapper>
            <InputField
              {...formdata.config}
              value={formdata.value}
              onChange={(event) => change({ event, id, blur: false })}
              onBlur={(event) => change({ event, id, blur: true })}
            />
            { showError() }
          </FormFieldWrapper>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  }

  return (
    <div>
      { renderTemplate() }
    </div>
  );
}

export default FormField;
