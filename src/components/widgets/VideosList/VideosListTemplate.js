import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CardInfo from '../CardInfo/cardInfo';

const VideoListItemWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #d5d5d5;
  background: #fff;
`;

const VideoThumbnail = styled.div`
  background-size: cover;
  
  & div {
    width: 90px;
    height: 90px;
    background-size: 40px !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-image: url(/images/play.png);
  }
`;

const VideoListItemContent = styled.div`
  flex-grow: 1;
  padding: 10px;
`;

const VideoTitle = styled.h2`
  font-size: 13px;
  color: #525252;
`;

const VideosTemplate = (props) => {
  return props.data.map(item => (
    <Link
      to={`/videos/${item.id}`}
      key={item.id}
    >
      <VideoListItemWrapper>
        <VideoThumbnail style={{
          backgroundImage: `url(/images/videos/${item.image})`
        }}>
          <div></div>
        </VideoThumbnail>
        <VideoListItemContent>
          <CardInfo
            date={item.date}
            teams={props.teams}
            team={item.team}
          />
          <VideoTitle>{ item.title }</VideoTitle>
        </VideoListItemContent>
      </VideoListItemWrapper>
    </Link>
  ));
};

export default VideosTemplate;
