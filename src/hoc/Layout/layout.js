import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './layout.css';

class Layout extends Component {
  state = {
    showNav: false
  }

  toggleSideNav = (value) => {
    this.setState({
      showNav: value
    })
  }

  render() {
    return (
      <div>
        <Header
          showNav={this.state.showNav}
          onHideNav={() => this.toggleSideNav(false)}
          onOpenNav={() => this.toggleSideNav(true)}
        />
        { this.props.children }
        <Footer/>
      </div>
    );

  }
}

export default Layout;
