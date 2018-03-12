import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { firebaseArticles, firebaseTeams, firebaseLooper } from '../../../firebase';

import styles from './newsList.css';
import Button from '../Buttons/buttons';
import CardInfo from '../CardInfo/cardInfo';

const NewsListItemWrapper = styled.article``;

const NewsListItem = styled.div`
  border: 1px solid #f2f2f2;
  background: #fff;
  margin-top: 0;
  padding: 8px 5px 0;
`;

const NewsListItemLink = styled(Link)`
  color: #525252;
  text-decoration: none;
  flex-grow: 1;
`;

const NewsListItemTitle = styled.h2`
  font-size: 13px;
  line-height: 21px;
  margin: 5px 0;
  color: inherit;
`;

const FlexWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #d5d5d5;
  background: #fff;
`;

const Left = styled.div`
  background-size: cover !important;
  
  & div {
    width: 90px;
    height: 90px;
    background-size: 40px !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
`;

const Right = styled.div`
  flex-grow: 1;
  padding: 10px;
`;

const FlexTitle = styled.h2`
  font-size: 12px;
  color: #525252;
`;

class NewsList extends Component {
  state = {
    items: [],
    teams: [],
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

    firebaseArticles
      .orderByChild('id')
      .startAt(start)
      .endAt(end)
      .once('value')
      .then(snapshot => {
        const items = firebaseLooper(snapshot);
        this.setState({
          items: [
            ...this.state.items,
            ...items
          ],
          start,
          end
        });
      });
  }

  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end, end);
    this.setState({
      start: this.state.end + 1,
      end: end
    })
  }

  renderNews() {
    let template = null;

    switch (this.props.type) {
      case 'card':
        template = this.state.items.map(item => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_wrapper_enter,
          }}
            timeout={500}
            key={item.id}
          >
            <NewsListItemWrapper>
              <NewsListItem>
                <NewsListItemLink
                  to={`articles/${item.id}`}
                >
                  <CardInfo
                    teams={this.state.teams}
                    team={item.team}
                    date={item.date}
                  />
                  <NewsListItemTitle>
                    { item.title }
                  </NewsListItemTitle>
                </NewsListItemLink>
              </NewsListItem>
            </NewsListItemWrapper>
          </CSSTransition>
        ));
        return template;
      case 'cardMain':
        template = this.state.items.map(item => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_wrapper_enter,
            }}
            timeout={500}
            key={item.id}
          >
            <Link to={`/articles/${item.id}`}>
               <FlexWrapper>
                 <Left className="left"
                    style={{
                      backgroundImage: `url(images/articles/${item.image})`
                    }}
                 >
                   <div></div>
                 </Left>
                 <Right>
                   <CardInfo
                     teams={this.state.teams}
                     team={item.team}
                     date={item.date}
                   />
                   <FlexTitle>
                     { item.title }
                   </FlexTitle>
                 </Right>
               </FlexWrapper>
            </Link>
          </CSSTransition>
        ));
        return template;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <TransitionGroup component="div" className="list">
          { this.renderNews() }
        </TransitionGroup>
        <Button
          type="loadmore"
          loadmore={this.loadMore}
          cta="Load More News"
        />
      </div>
    );
  }
}

export default NewsList;
