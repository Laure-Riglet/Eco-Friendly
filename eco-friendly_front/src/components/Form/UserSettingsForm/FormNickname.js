/* eslint-disable brace-style */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from '../../Field/Input';
import Button from '../../Button';

import {
  userOnInputChange,
  userSettingsUpdate,
  userRemoveErrorMessages,
  userToggleIsUpdated,
} from '../../../actions/user';
import { closeModal } from '../../../actions/common';

import './styles.scss';

export default function FormNickname() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Save nickname value with new key in sessionStorage */
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      sessionStorage.setItem('nickname', JSON.stringify(user.nickname));
    }
  }, []);

  /* control input fields */
  const nickname = useSelector((state) => state.user.nickname);

  const changeField = (value, identifier) => {
    dispatch(userOnInputChange(value, identifier));
  };

  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRemoveErrorMessages());
    dispatch(userSettingsUpdate());
  };

  /* Save sessionStorage nickname value in state nickname key if user cancels */
  const handleCancel = () => {
    if (sessionStorage.getItem('nickname')) {
      dispatch(
        userOnInputChange(
          JSON.parse(sessionStorage.getItem('nickname')),
          'nickname',
        ),
      );
    }
    dispatch(closeModal());
  };

  /* Error messages */
  const nicknameErrorMessages = useSelector(
    (state) => state.user.nicknameErrorMessages,
  );

  /* Check if is updated */
  const isUpdated = useSelector((state) => state.user.isUpdated);

  useEffect(() => {
    if (isUpdated) {
      sessionStorage.removeItem('nickname');
      sessionStorage.removeItem('user');
      dispatch(userToggleIsUpdated());
      navigate(`/utilisateurs/${nickname}`, { replace: true });
      dispatch(closeModal());
    }
  }, [isUpdated, nickname]);

  return (
    <div className="modal-form nickename">
      <h5 className="title text-primary">Modifier mon pseudo</h5>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nickname"
          placeholder="Pseudo"
          onChange={changeField}
          value={nickname}
          color="primary"
        />
        {nicknameErrorMessages && nicknameErrorMessages.length > 0 && (
          <div className="messages error-messages">
            <ul>
              {nicknameErrorMessages.map((item) => (
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
