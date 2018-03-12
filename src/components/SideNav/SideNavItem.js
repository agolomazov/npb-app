import React from 'react';
import styled from 'styled-components';

import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

const SideNavItemWrapper = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: #bababa;
  padding: 10px;
  border-top: 1px solid #404040;
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const NavIcon = styled(FontAwesome)`
  color: #fff;
  margin-right: 10px;
`;

const SideNavItem = (props) => (
  <SideNavItemWrapper>
    <NavLink to={props.to}>
      <NavIcon {...props} /> {props.children}
    </NavLink>
  </SideNavItemWrapper>
);

export default SideNavItem;
