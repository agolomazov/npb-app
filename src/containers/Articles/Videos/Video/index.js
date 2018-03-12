import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './header';
import VideosRelated from '../../../../components/widgets/VideosList/VideosRelated/videoRelated';
import styled from 'styled-components';
import { firebaseDB, firebaseLooper, firebaseTeams, firebaseVideos } from '../../../../firebase';

const VideoWrapper = styled.div`
  background: #fff;
  margin: 0 5px;
  border: 1px solid #c5c5c5;
`;

const VideoTitle = styled.h1`
  font-size: 25px;
  font-weight: 400;
  color: #4d4d4d;
  margin: 15px 0;
  padding: 0 10px;
`;

class VideoArticle extends PureComponent {
  state = {
    article: null,
    team: null,
    related: [],
    teams: []
  }
  
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.loadedData(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const { match: { params: { id } } } = this.props;
      this.loadedData(id);
    }
  }

  loadedData (id) {
    firebaseDB.ref(`/videos/${id}`)
      .once('value')
      .then(snapshot => {
        const article = snapshot.val();
        firebaseTeams.orderByChild('teamId')
          .equalTo(article.team)
          .once('value')
          .then(snapshot => {
            const team = firebaseLooper(snapshot);
            this.setState({
              article,
              team: team[0]
            });
          });
      });

    this.getRelated();
  }


  getRelated() {
    firebaseTeams
      .once('value')
      .then(snapshot => {
        const teams = firebaseLooper(snapshot);
        const { article: { team } } = this.state;
        firebaseVideos
          .orderByChild('team')
          .equalTo(team)
          .limitToFirst(3)
          .once('value')
          .then(snapshot => {
            const related = firebaseLooper(snapshot);
            this.setState({
              teams,
              related
            });
        })
      })
  };

  render() {
    const { article, team, related, teams } = this.state;
    let header = null;
    let articleBody = null;
    let relatedVideos = null;

    if(team) {
      header = (<Header
        teamData={team}
      />);
    }

    if(article) {
      articleBody = (
        <VideoWrapper>
          <VideoTitle>{ article.title }</VideoTitle>
          <iframe
            title="videoplayer"
            width="100%"
            frameBorder="0"
            height="300px"
            src={`https://www.youtube.com/embed/${article.url}`}
          ></iframe>
        </VideoWrapper>
      );
    }

    if(related) {
      relatedVideos = (
        <VideosRelated
          data={related}
          teams={teams}
        />
      );
    }

    return (
      <Fragment>
        { header }
        { articleBody }
        { relatedVideos }
      </Fragment>
    );
  }
}

export default withRouter(VideoArticle);
