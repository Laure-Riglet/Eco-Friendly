import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal } from '../../actions/common';

import './styles.scss';

export default function Modal({ children }) {
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={toggleModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
