import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  userOnInputChange,
  userEmailUpdate,
  userRemoveErrorMessages,
  userToggleIsUpdated,
  userLogout,
} from '../../../actions/user';
import { closeModal } from '../../../actions/common';

import Input from '../../Field/Input';
import Button from '../../Button';

import './styles.scss';

export default function FormEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Save email value with new key in sessionStorage */
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      sessionStorage.setItem('email', JSON.stringify(user.email));
    }
  }, []);

  /* control input fields */
  const email = useSelector((state) => state.user.email);

  const changeField = (value, identifier) => {
    dispatch(userOnInputChange(value, identifier));
  };

  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRemoveErrorMessages());
    dispatch(userEmailUpdate());
  };

  /* Save sessionStorage email values in state */
  const handleCancel = () => {
    if (sessionStorage.getItem('email')) {
      dispatch(
        userOnInputChange(JSON.parse(sessionStorage.getItem('email')), 'email'),
      );
    }
    dispatch(closeModal());
  };

  /* Error messages */
  const emailErrorMessages = useSelector(
    (state) => state.user.emailErrorMessages,
  );

  /* Check if is updated */
  const isUpdated = useSelector((state) => state.user.isUpdated);

  useEffect(() => {
    if (isUpdated) {
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('user');
      dispatch(userToggleIsUpdated());
      dispatch(userLogout());
      dispatch(closeModal());
      navigate('/enregistrement', { replace: true });
    }
  }, [isUpdated]);

  return (
    <div className="modal-form email">
      <h5 className="title text-primary">Modifier mon Email</h5>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeField}
          value={email}
          color="primary"
        />
        {emailErrorMessages && emailErrorMessages.length > 0 && (
          <div className="messages error-messages">
            <ul>
              {emailErrorMessages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit" color="primary">
          C'est prêt !
        </Button>
        <Button type="reset" onclick={handleCancel}>
          Annuler
        </Button>
      </form>
    </div>
  );
}
