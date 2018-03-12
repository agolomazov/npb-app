import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './containers/Home/home';
import NewsArticle from './containers/Articles/News/Post/index';
import VideoArticle from './containers/Articles/Videos/Video/index';
import NewsMain from './containers/Articles/News/Main/index';
import VideosMain from './containers/Articles/Videos/Main/index';
import SignIn from './containers/SignIn/SignIn';
import Layout from './hoc/Layout/layout';

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/news" exact component={NewsMain} />
          <Route path="/articles/:id" exact component={NewsArticle} />
          <Route path="/videos/:id" exact component={VideoArticle} />
          <Route path="/videos" exact component={VideosMain} />
          <Route path="/sign-in" exact component={SignIn} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
