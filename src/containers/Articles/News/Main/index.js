import React, { Fragment } from 'react';
import NewsSlider from '../../../../components/widgets/NewsSlider/slider';
import NewsList from '../../../../components/widgets/NewsList/newsList';

const NewsMain = () => (
  <Fragment>
    <NewsSlider
      type="featured"
      settings={{dots:false}}
      start={0}
      amount={3}
    />
    <NewsList
      type="cardMain"
      start={3}
      amount={3}
    />
  </Fragment>
);

export default NewsMain;
