import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Slide from './Slide';
// import Controller from './Controller';

import './styles.scss';

/**
 * Component to display a list of slides
 * with the option of being able to add an automatic behavior
 * <Slider delay={2500} slides={datas} automatic/>
 *
 * @param {Object}  props           Component properties
 * @param {array}   props.slides    Datasets to display
 * @param {number}  props.delay     Represents the display time of a slide
 * @param {boolean} props.automatic Activate or deactivate the automatic display of slides
 * @returns
 */
export default function Slider({ slides, delay, automatic }) {
  const [current, setCurrent] = useState(0);
  const { length } = slides;

  const next = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    let timer = null;
    if (automatic) {
      timer = setTimeout(() => {
        next();
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="carousel">
      <div className="carousel-wrapper">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={
                index === current ? 'carousel-item active' : 'carousel-item'
              }
            >
              <Slide
                title={slide.title}
                content={slide.content}
                slug={slide.slug}
                picture={slide.picture}
                tag={slide.category.name}
              />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={prev}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" onClick={next}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* <div className="controllers">
        {slides.map((slide, index) => (
          <Controller
            key={slide.id}
            title={slide.title}
            content={slide.content}
            slug={slide.slug}
            tag={slide.category.name}
            active={index === current}
          />
        ))}
      </div> */}
    </div>
  );
}

Slider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
      slug: PropTypes.string,
      picture: PropTypes.string,
      tag: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
  delay: PropTypes.number,
  automatic: PropTypes.bool,
};

Slider.defaultProps = {
  delay: 2500,
  automatic: false,
};
