import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoadMoreButton = styled.button`
  background: #2196f3;
  border-bottom: 1px solid #d7d7d7;
  color: #eee;
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 9px;
  cursor: pointer;
  text-align: center;
`;

const LinkTo = styled(Link)`
  background: #2196f3;
  border-bottom: 1px solid #d7d7d7;
  color: #eee;
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 9px;
  cursor: pointer;
  text-align: center;
`;

const Buttons = (props) => {
  let template = null;

  switch (props.type) {
    case 'loadmore':
      template = (
        <LoadMoreButton
          onClick={() => props.loadmore()}
        >
          {props.cta}
        </LoadMoreButton>);
      return template;
    case 'linkTo':
      template = (
        <LinkTo to={props.linkTo}>{props.cta}</LinkTo>
      );
      return template;
    default: return template;
  }
};

export default Buttons;
