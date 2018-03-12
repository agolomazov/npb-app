import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import SideNav from '../SideNav/SideNav';

const HeaderWrapper = styled.header`
  background: #242424;
  border-bottom: 1px solid #000;
`;

const HeaderOpt = styled.div`
  display: flex;
`;

const Logo = styled(Link)`
  flex-grow: 1;
  padding-top 8px;
`;

const LogoImg = styled.img`
  width: 35px;
`;

const Navbar = styled.div`
  margin: 0;
`;

const NavBarIcon = styled(FontAwesome)`
  color: #dfdfdf;
  padding: 10px;
  cursor: pointer;
`;

const Header = (props) => {
  return (
    <HeaderWrapper>
      <SideNav {...props} />

      <HeaderOpt>
        <Navbar>
          <NavBarIcon
            name="bars"
            onClick={props.onOpenNav}
          />
        </Navbar>
        <Logo to="/">
          <LogoImg
            src="/images/nba_logo.png"
            alt="NBA Logo"
          />
        </Logo>
      </HeaderOpt>
    </HeaderWrapper>
  );
};

export default Header;
