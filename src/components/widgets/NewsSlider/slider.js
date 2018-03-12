import React, { Component } from 'react';
import SliderTemplates from './slider_templates';
import { firebaseArticles, firebaseLooper } from '../../../firebase';

class NewsSlider extends Component {

  state = {
    news: []
  }

  componentDidMount() {
    const { start, amount } = this.props;
    firebaseArticles.limitToFirst(3)
      .once('value')
      .then(snapshot => {
        const news = firebaseLooper(snapshot);
        this.setState({
          news
        });
      })
  }

  render() {
    return (
      <div>
        <SliderTemplates
          data={this.state.news}
          type={ this.props.type }
          settings={ this.props.settings }
        />
      </div>
    );
  }
}

export default NewsSlider;
