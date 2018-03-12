import React from 'react';
import Slick from 'react-slick';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Slide = styled.div`
  position: relative;
`;

const SlideLink = styled(Link)`
  position: absolute;
  width: 100%;
  bottom: 0px;
  text-decoration: none;
  right: 0;
`;

const SlideImage = styled.div`
  height: 330px;
  background-size: cover !important;
  background-repeat: no-repeat !important;
`;

const SlideCaption = styled.div`
  color: #fff;
  top: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-weight: 300;
  font-size: 28px;
`;

const SliderTemplates = (props) => {
  let template = null;
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...props.settings
  };

  switch (props.type) {
    case 'featured':
      template = props.data.map(item => (
        <div key={item.id}>
          <Slide>
            <SlideImage
              style={{
                backgroundImage: `url(images/articles/${item.image})`
              }}
            />
            <SlideLink to={`/articles/${item.id}`} >
              <SlideCaption>
                { item.title }
              </SlideCaption>
            </SlideLink>
          </Slide>
        </div>
      ));
      break;
    default: null;
  }

  return (
    <Slick {...settings}>
      { template }
    </Slick>
  );
};

export default SliderTemplates;
