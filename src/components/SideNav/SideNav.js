import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItem from './SideNavItem';

const SideNavigation = (props) => (
  <div
    onClick={props.onHideNav}
  >
    <SideNav
      showNav={props.showNav}
      onShowNav={props.onOpenNav}
      navStyle={{
        background: '#242424',
        maxWidth: '220px',
        boxShadow: 'none'
      }}
    >
      <SideNavItem to="/" name="home">Home page</SideNavItem>
      <SideNavItem to="/news" name="file-text-o">News</SideNavItem>
      <SideNavItem to="/videos" name="play">Videos</SideNavItem>
      <SideNavItem to="/sign-in" name="sign-in">Sign in</SideNavItem>
      <SideNavItem to="/sign-out" name="sign-out">Sign out</SideNavItem>
    </SideNav>
  </div>
);

export default SideNavigation;
