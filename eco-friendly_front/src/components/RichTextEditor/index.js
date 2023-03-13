import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

import './styles.scss';

function RichTextEditor({ name, value, onChange }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

  return (
    <ReactQuill
      modules={modules}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default RichTextEditor;

RichTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

RichTextEditor.defaultProps = {
  value: '',
};
