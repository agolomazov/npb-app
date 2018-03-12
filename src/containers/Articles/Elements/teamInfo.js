import React from 'react';
import styled from 'styled-components';

const TeamHeader = styled.div`
  border: 1px solid #c5c5c5;
  border-bottom: 0px;
  background: #fff;
  margin: 5px 5px 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeamLogo = styled.div`
  width: 57px;
  height: 50px;
  background-repeat: no-repeat !important;
  background-size: 65% !important;
  background-position: center center !important;
`;

const TeamRight = styled.div`
  flex-grow: 1;
  padding-left: 10px;
  font-size: 15px;
  font-weight: 300;
`;

const TeamInfo = ({data}) => {
  return (
    <TeamHeader>
      <TeamLogo
        style={{
          backgroundImage: `url(/images/teams/${data.logo})`
        }}
      />
      <TeamRight>
        <div>
          <span>{data.city} {data.name}</span>
        </div>
        <div>
          <strong>
            W{data.stats[0].wins} - L{data.stats[0].defeats}
          </strong>
        </div>
      </TeamRight>
    </TeamHeader>
  );
};

export default TeamInfo;
