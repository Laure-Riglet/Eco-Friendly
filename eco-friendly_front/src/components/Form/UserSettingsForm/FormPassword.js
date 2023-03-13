/* eslint-disable brace-style */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  userOnInputChange,
  userRemoveErrorMessages,
  userSendEmailVerification,
  userToggleIsUpdated,
} from '../../../actions/user';
import { closeModal } from '../../../actions/common';

import Input from '../../Field/Input';
import Button from '../../Button';

import './styles.scss';

export default function FormPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Save isRegistring, email and nickname values in sessionStorage */
  const isRegistring = useSelector((state) => state.user.isRegistring);
  const nickname = useSelector((state) => state.user.nickname);
  const email = useSelector((state) => state.user.email);

  const confirmationEmail = useSelector(
    (state) => state.user.confirmationEmail,
  );

  useEffect(() => {
    sessionStorage.setItem('isRegistring', JSON.stringify(isRegistring));
    sessionStorage.setItem('nickname', JSON.stringify(nickname));
    sessionStorage.setItem('email', JSON.stringify(confirmationEmail));
  }, [isRegistring, confirmationEmail, nickname]);

  /* control input fields */
  const changeField = (value, identifier) => {
    dispatch(userOnInputChange(value, identifier));
  };

  /* Error messages */
  const emailErrorMessages = useSelector(
    (state) => state.user.emailErrorMessages,
  );

  const [confirmationMessageError, setConfirmationMessageError] = useState();

  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRemoveErrorMessages());

    if (email !== confirmationEmail) {
      setConfirmationMessageError(
        "L'adresse email saisie n'est pas la même que celle enregistrée.",
      );
    } else {
      dispatch(userSendEmailVerification(confirmationEmail));
    }
  };

  /* clear confirmationEmail fileld */
  const handleCancel = () => {
    dispatch(userOnInputChange('', 'confirmationEmail'));
    dispatch(closeModal());
  };

  /* Redirect user if is updated  */
  const isUpdated = useSelector((state) => state.user.isUpdated);

  useEffect(() => {
    if (isUpdated) {
      dispatch(userToggleIsUpdated());
      navigate('/enregistrement', { replace: true });
    }
  }, [isUpdated]);

  return (
    <div className="modal-form password">
      <h5 className="title text-primary">Modifier mon mot de passe</h5>
      <p className="password-text">
        Pour des raisons de sécurité, vous devez saisir votre adresse email
        actuelle pour modifier votre mot de passe.
      </p>
      <p className="password-text">Un email vous sera envoyé avec un lien.</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="confirmationEmail"
          placeholder="Email"
          onChange={changeField}
          value={confirmationEmail}
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
        {confirmationMessageError && (
          <div className="messages error-messages">
            <p>{confirmationMessageError}</p>
          </div>
        )}
        <Button type="submit" color="primary">
          C'est parti !
        </Button>
        <Button type="reset" onclick={handleCancel}>
          Annuler
        </Button>
      </form>
    </div>
  );
}
