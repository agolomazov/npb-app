import React, { Component, Fragment } from 'react';

import NewsSlider from '../../components/widgets/NewsSlider/slider';
import NewsList from '../../components/widgets/NewsList/newsList';
import VideosList from '../../components/widgets/VideosList/videosList';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <NewsSlider
          type="featured"
          start={0}
          amount={3}
          settings={{
            dots: false,
          }}
        />
        <NewsList
          type="card"
          loadmore={true}
          start={3}
          amount={3}
        />
        <VideosList
          type="card"
          title={true}
          loadmore={true}
          start={0}
          amount={3}
        />
      </Fragment>
    );
  }
}

export default Home;
