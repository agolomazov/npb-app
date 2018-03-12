import React from 'react';
import FontAswesome from 'react-fontawesome';
import styled from 'styled-components';
import moment from 'moment';

const CardWrapper = styled.div`
  font-size: 11px;
`;

const CardTeamName = styled.span`
  margin-right: 7px;
  background: #d1d1d1;
  color: #fff;
  padding: 3px 5px 1px;
`;

const CardDate = styled.span`
  color: #2196f3;
`;

const CardInfo = (props) => {
  const teamName = (teams, team) => {
    const findtItem = teams.find(teamItem => teamItem.teamId === team);
    if(findtItem) {
      return findtItem.name
    }
    return null;
  };

  return (
    <CardWrapper>
      <CardTeamName>
        { teamName(props.teams, props.team) }
      </CardTeamName>
      <CardDate>
        <FontAswesome name="clock-o" />
        {' '}{ moment(props.date).format('DD/MM/YYYY') }
      </CardDate>
    </CardWrapper>
  );
};

export default CardInfo;
