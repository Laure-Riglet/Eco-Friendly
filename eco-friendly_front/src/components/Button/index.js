/* eslint-disable react/button-has-type */
/* eslint-disable brace-style */
import PropTypes from 'prop-types';

import './styles.scss';

/**
 * Component to display a custom button
 *
 * @param {Object}  props                   Component properties
 * @param {String}  props.name              Name of the button
 * @param {String}  props.type              Type of the button
 * @param {String}  props.color             Color of the button default gray (primary, secondary
 * @param {Boolean} props.outline           Apparence of the button
 * @param {Boolean} props.link              Apparence of the button
 * @param {String}  props.size              Size of the button (sm, lg)
 * @param {Function} props.onclick          Function to call on click
 * @param {ReactNodeLike}  props.children   Children of the component
 * @returns
 */
export default function Button({
  type,
  name,
  color,
  outline,
  link,
  size,
  onclick,
  children,
}) {
  let className = 'btn';

  if (size) {
    className += ` btn-${size}`;
  }

  if (color) {
    if (outline) {
      className += ` btn-outline-${color}`;
    } else if (link) {
      className += ` btn-link-${color}`;
    } else {
      className += ` btn-${color}`;
    }
  }

  return (
    <button type={type} name={name} className={className} onClick={onclick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  outline: PropTypes.bool,
  link: PropTypes.bool,
  size: PropTypes.string,
  name: PropTypes.string,
  onclick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  color: '',
  outline: false,
  link: false,
  name: '',
  size: '',
  onclick: () => {},
};
