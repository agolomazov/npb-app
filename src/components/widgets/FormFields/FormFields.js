import React from 'react';
import { FormFieldWrapper, FormFieldError, InputField, FormSelect } from './styled';

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
      case 'select':
        formTemplate = (
          <FormFieldWrapper>
            <FormSelect
              value={formdata.value}
              name={formdata.config.name}
              onChange={(event) => change({ event, id, blur: false })}
              onBlur={(event) => change({ event, id, blur: true })}
            >
              { formdata.config.options.map((opt, idx) => (
                <option
                  key={idx}
                  value={opt.id}
                >
                  {opt.name}
                </option>
              )) }
            </FormSelect>
          </FormFieldWrapper>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  }

  return (
    renderTemplate()
  );
}

export default FormField;
