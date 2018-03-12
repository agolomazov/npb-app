import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CURRENT_YEAR } from '../../config';

const FooterWrapper = styled.footer`
  margin-top: 20px;
  background: #242424;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 20px;
  padding: 10px;
`;

const Copyrights = styled.div`
  flex-grow: 1;
  color: #878787;
  font-size: 12px;
`;

const Footer = (props) => {
  return (
    <FooterWrapper>
      <Link to="/">
        <Image src="/images/nba_logo.png" alt="nba logo"/>
      </Link>
      <Copyrights>
        @NBA { CURRENT_YEAR } All rights reserved.
      </Copyrights>
    </FooterWrapper>
  );
};

export default Footer;
