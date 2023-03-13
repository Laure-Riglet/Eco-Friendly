/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';

import './styles.scss';

/**
 * Card component
 * with the option to have the card in a vertical or horizontal version
 */
function Card({ format, picture, title, category, content }) {
  return (
    <div className="card" data-format={format}>
      {picture && (
        <div className="image">
          <img src={picture} alt={title} className="image-img" />
        </div>
      )}
      <div className="informations">
        <h3 className="title">{title}</h3>
        {category && <span className="category">{category.name}</span>}
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="summary inner-html"
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  format: PropTypes.string,
  picture: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  content: PropTypes.string,
};
Card.defaultProps = {
  format: '',
  picture: '',
  title: '',
  category: '',
  content: '',
};

export default Card;
