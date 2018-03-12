import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const PostInfoWrapper = styled.article`
  border: 1px solid #c5c5c5;
  border-bottom: 0px;
  background: #fff;
  margin: 0 5px;
  padding: 10px;
  font-size: 13px;
  font-weight: 300;
`;

const InfoValue = styled.span`
  font-weight: 500;
`;

const PostInfo = ({date, author }) => {
  return (
    <PostInfoWrapper>
      <div>
        Date: <InfoValue>{ moment(date).format('DD/MM/YYYY') }</InfoValue>
      </div>
      <div>
        Author: <InfoValue>{ author }</InfoValue>
      </div>
    </PostInfoWrapper>
  );
};

export default PostInfo;
