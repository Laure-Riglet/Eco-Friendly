import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Controller({ title, content, slug, tag, active }) {
  return (
    <div className={active ? 'controller active' : 'controller'}>
      <Link to={`/articles/${slug}`} className="controller-body">
        <div className="controller-header">
          <h5 className="controller-title">{title}</h5>
          <span className="controller-tag">{tag}</span>
        </div>
        <p className="controller-text">{content}</p>
      </Link>
    </div>
  );
}

Controller.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

Controller.defaultProps = {
  active: false,
};
