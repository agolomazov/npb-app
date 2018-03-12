import React from 'react';
import TeamInfo from '../../Elements/teamInfo';
import PostInfo from '../../Elements/postinfo';

const Header = (props) => {
  const {teamData, author, date} = props;

  const getTeamInfo = (data) => (
    data ? <TeamInfo data={data} /> : null
  );

  const getPostData = (date, author) => (
    !date || !author ? null : <PostInfo date={date} author={author} />
  );

  return (
    <header>
      { getTeamInfo(teamData) }
      { getPostData(date, author) }
    </header>
  );
};

export default Header;
