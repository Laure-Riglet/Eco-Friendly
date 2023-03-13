/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export default function Slide({ title, content, slug, picture, tag }) {
  return (
    <div className="slide">
      <div className="slide-inner">
        <div className="slide-image">
          <img src={picture} alt={`${{ title }}`} />
        </div>
        <div className="slide-body">
          <h5 className="slide-title">{title}</h5>
          <span className="slide-tag">{tag}</span>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="slide-text inner-html"
          />
          <Link to={`/articles/${slug}`} className="slide-link">
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}

Slide.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  slug: PropTypes.string,
  picture: PropTypes.string,
  tag: PropTypes.string,
};
Slide.defaultProps = {
  title: '',
  content: '',
  slug: '',
  picture: '',
  tag: '',
};
