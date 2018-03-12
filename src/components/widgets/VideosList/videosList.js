import React, {Component} from 'react';
import styled from 'styled-components';
import Button from '../Buttons/buttons';
import VideosListTemplate from './VideosListTemplate';
import { firebaseVideos, firebaseTeams, firebaseLooper } from '../../../firebase';

const VideosListWrapper = styled.div``;

const VideosListTitle = styled.h3`
  text-align: center;
  margin: 20px;
  color: #353535;
  font-weight: 300;
  font-size: 21px;
`;

class VideosList extends Component {
  state = {
    teams: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  }

  componentDidMount() {
    const {start, end} = this.state;
    this.request(start, end);
  }

  request = (start, end) => {
    if (!this.state.teams.length) {
      firebaseTeams.once('value').then(snapshot => {
        const teams = firebaseLooper(snapshot);
        this.setState({
          teams
        });
      })
    }

    firebaseVideos
      .orderByChild('id')
      .startAt(start)
      .endAt(end)
      .once('value')
      .then(snapshot => {
        const videos = firebaseLooper(snapshot);
        this.setState({
          videos: [
            ...this.state.videos,
            ...videos
          ],
          start,
          end
        });
      })
  }

  renderTitle() {
    if (!this.props.title) {
      return null;
    }

    return (
      <VideosListTitle>
        <strong>NBA</strong> Videos
      </VideosListTitle>
    );
  }
  
  loadmore = () => {
    const end = this.state.end + this.state.amount;
    this.request(this.state.end + 1, end);
  }

  renderButton() {
    return this.props.loadmore ?
      <Button
        type="loadmore"
        cta="Load More Videos"
        loadmore={this.loadmore}
      />
      :
      <Button
        type="linkTo"
        cta="Load More Videos"
        linkTo="/videos"
      />
  }

  renderVideos() {
    const { videos } = this.state;
    const { type } = this.props;
    let template = null;

    switch (type) {
      case 'card':
        template = (<VideosListTemplate
          data={this.state.videos}
          teams={this.state.teams}
        />);
        break;
      default:
        template = null;
    }

    return template;
  }

  render() {
    return (
      <VideosListWrapper>
        { this.renderTitle() }
        { this.renderVideos() }
        { this.renderButton() }
      </VideosListWrapper>
    );
  }
}

export default VideosList;
