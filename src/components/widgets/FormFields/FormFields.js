import React from 'react';
import styled from 'styled-components';

const FormField = ({ formdata, change, id }) => {
  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <div>
            input
          </div>
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
