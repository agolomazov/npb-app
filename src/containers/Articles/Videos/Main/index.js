import React, { Fragment } from 'react';
import VideosList from '../../../../components/widgets/VideosList/videosList';

const VideosMain = (props) => (
  <Fragment>
    <VideosList
      type="card"
      title={false}
      loadmore={true}
      start={0}
      amount={8}
    />
  </Fragment>
);

export default VideosMain;
