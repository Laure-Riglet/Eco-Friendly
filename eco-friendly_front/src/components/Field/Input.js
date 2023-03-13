import PropTypes from 'prop-types';

import './input.scss';

export default function Input({
  value,
  type,
  name,
  placeholder,
  color,
  onChange,
}) {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  const idValue = `input-${name}`;

  return (
    <div className={value.length > 0 ? 'field field-completed' : 'field'}>
      <label htmlFor={idValue} className={`field-label field-label-${color}`}>
        {placeholder}
      </label>
      <input
        value={value}
        onChange={handleChange}
        id={idValue}
        type={type}
        placeholder={placeholder}
        name={name}
        className={`field-input field-${color}`}
      />
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  value: '',
  type: 'text',
  color: 'default',
};
