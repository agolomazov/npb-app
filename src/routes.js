import React from 'react';
import {Switch} from 'react-router-dom';
import Home from './containers/Home/home';
import NewsArticle from './containers/Articles/News/Post/index';
import VideoArticle from './containers/Articles/Videos/Video/index';
import NewsMain from './containers/Articles/News/Main/index';
import VideosMain from './containers/Articles/Videos/Main/index';
import SignIn from './containers/SignIn/SignIn';
import Dashboard from './containers/Dashboard/Dashboard';
import Layout from './hoc/Layout/layout';

import PrivateRoutes from './components/AuthRoutes/privateRoutes';
import PublicRoutes from './components/AuthRoutes/publicRoutes';

const Routes = (props) => {
  return (
    <Layout user={props.user}>
      <Switch>
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home}/>
        <PublicRoutes {...props} restricted={false} path="/news" exact component={NewsMain}/>
        <PublicRoutes {...props} restricted={false} path="/articles/:id" exact component={NewsArticle}/>
        <PublicRoutes {...props} restricted={false} path="/videos/:id" exact component={VideoArticle}/>
        <PublicRoutes {...props} restricted={false} path="/videos" exact component={VideosMain}/>
        <PublicRoutes {...props} restricted={true} path="/sign-in" exact component={SignIn}/>
        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
      </Switch>
    </Layout>
  );
};

export default Routes;
