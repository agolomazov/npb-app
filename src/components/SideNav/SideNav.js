import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItem from './SideNavItem';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import { firebase } from '../../firebase';
import { withRouter } from 'react-router-dom';

const LogOutButton = styled.button`
  font-weight: 300;
  font-size: 12px;
  color: #bababa;
  padding: 10px;
  border: none;
  border-top: 1px solid #404040;
  background: transparent;
  text-align: left;
`;

const LogOutButtonIcon = styled(FontAwesome)`
   color: #fff;
  margin-right: 10px;
`;

const SideNavigation = (props) => {
  const items = [
    {
      icon: 'home',
      text: 'Home page',
      link: '/',
      login: ''
    },
    {
      icon: 'file-text-o',
      text: 'News',
      link: '/news',
      login: ''
    },
    {
      icon: 'play',
      text: 'Videos',
      link: '/videos',
      login: ''
    },
    {
      icon: 'sign-in',
      text: 'Sign In',
      link: '/sign-in',
      login: true
    },
    {
      icon: 'sign-in',
      text: 'Dashboard',
      link: '/dashboard',
      login: false
    },
    {
      icon: 'sign-out',
      text: 'Sign Out',
      link: '/sign-out',
      login: false
    }
  ];

  const element = (item, i) => (
    <SideNavItem
      to={item.link}
      name={item.icon}
      key={i}
    >
      { item.text }
    </SideNavItem>
  );

  const restricted = (item, i) => {
    let template = null;

    if (props.user === null && item.login) {
      template = element(item, i);
    }

    if (props.user !== null && !item.login) {
      if(item.link === '/sign-out') {
        template = (
          <LogOutButton key={i}
            onClick={() => { firebase.auth().signOut().then(() => {
              props.history.push('/sign-in');
            }) }}
          >
            <LogOutButtonIcon name={item.icon}/>
            { item.text }
          </LogOutButton>
        );
      } else {
        template = element(item, i)
      }
    }

    return template;
  };

  const showItems = () => {
    return items.map((item, i) => {
      return item.login !== '' ? restricted(item, i) : element(item, i)
    });
  }

  return (
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
        { showItems() }
      </SideNav>
    </div>
  );
};

export default withRouter(SideNavigation);
