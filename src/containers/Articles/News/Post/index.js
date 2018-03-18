import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import Header from './header';
import styled from 'styled-components';
import { firebaseDB, firebaseLooper, firebaseTeams, firebase } from '../../../../firebase';

const ArticleBody = styled.div`
  background: #fff;
  margin: 0 5px;
  border: 1px solid #c5c5c5;
  padding: 10px;
`;

const ArticleTitle = styled.h1`
  font-size: 25px;
  font-weight: 400;
  color: #4d4d4d;
  margin: 15px 0;
`;

const ArticleImage = styled.div`
  background-repeat: no-repeat !important;
  background-size: cover !important;
  width: 100%;
  height: 200px;
  background-position: center center !important;
`;

const ArticleText = styled.div`
  font-weight: 300;
  color: #666;
  line-height: 23px;
  margin: 15px 0;
`;

class NewsArticles extends Component {
  state = {
    article: null,
    team: null,
    imageURL: ''
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    firebaseDB.ref(`/articles/${id}`)
      .once('value')
      .then(snapshot => {
        const article = snapshot.val();
        firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value').then(snapshot => {
          const team = firebaseLooper(snapshot);
          this.setState({
            article,
            team: team[0]
          });
          this.getImageURL(article.image)
        })
      })
    ;
  }

  getImageURL = (filename) => {
    firebase.storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          imageURL: url
        })
      }).catch(() => {
       this.setState({
         imageURL: `/images/articles/${filename}`
       });
    })
  }

  render() {
    const { article, team } = this.state;

    let header = null;
    let articleBody = null;

    if(article && team) {
      header = (<Header
        teamData={team}
        date={article.date}
        author={article.author}
      />);
    }

    if (article) {
      articleBody = (
        <ArticleBody>
          <ArticleTitle>{ article.title }</ArticleTitle>
          <ArticleImage style={{
            backgroundImage: `url(${this.state.imageURL})`
          }} />
          <ArticleText
            dangerouslySetInnerHTML={{
              __html: article.body
            }}
          />
        </ArticleBody>
      );
    }

    return (
      <Fragment>
        { header }
        { articleBody }
      </Fragment>
    );
  }
}

export default withRouter(NewsArticles);
