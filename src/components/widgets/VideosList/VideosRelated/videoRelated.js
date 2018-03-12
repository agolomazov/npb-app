import React from 'react';
import styled from 'styled-components';
import VideoListTemplate from '../VideosListTemplate';

const RelatedWrapper = styled.div`
  margin: 0 5px;
`;

const videosRelated = (props) => {
  return (
    <RelatedWrapper>
      <VideoListTemplate
        data={props.data}
        teams={props.teams}
      />
    </RelatedWrapper>
  );
};

export default videosRelated;
