import React from 'react';
import TeamInfo from '../../Elements/teamInfo';

const Header = ({ teamData }) => {
  return (
    <header>
      <TeamInfo data={teamData} />
    </header>
  );
};

export default Header;
