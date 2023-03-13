/* eslint-disable brace-style */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { removeErrorMessages, closeModal } from '../../../actions/common';
import { userOnInputChange, userRegister } from '../../../actions/user';

import Input from '../../Field/Input';
import Button from '../../Button';

import './styles.scss';

export default function FormRegister({ toggleForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Control input fields */
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const confirmPassword = useSelector((state) => state.user.confirmPassword);
  const nickname = useSelector((state) => state.user.nickname);
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);

  const changeField = (value, identifier) => {
    dispatch(userOnInputChange(value, identifier));
  };

  /* Control password confirmation */
  const [confirmPasswordErrorMessages, setConfirmPasswordErrorMessages] =
    useState([]);

  /* Submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removeErrorMessages());

    if (password !== confirmPassword) {
      setConfirmPasswordErrorMessages([
        'Les mots de passe ne correspondent pas',
      ]);
    } else {
      setConfirmPasswordErrorMessages([]);
      dispatch(userRegister());
    }
  };

  /* Redirect user if is registring  */
  const isRegitring = useSelector((state) => state.user.isRegitring);

  if (isRegitring) {
    dispatch(closeModal());
    navigate('/enregistrement', { replace: true });
  }

  /* Control error messages */
  const emailErrorMessages = useSelector(
    (state) => state.user.emailErrorMessages,
  );
  const passwordErrorMessages = useSelector(
    (state) => state.user.passwordErrorMessages,
  );
  const nicknameErrorMessages = useSelector(
    (state) => state.user.nicknameErrorMessages,
  );

  return (
    <div className="inscription">
      <h5 className="title text-primary">S'inscrire</h5>
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
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={changeField}
          value={password}
          color="primary"
        />
        {passwordErrorMessages && passwordErrorMessages.length > 0 && (
          <div className="messages error-messages">
            <ul>
              {passwordErrorMessages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmation du mot de passe"
          onChange={changeField}
          value={confirmPassword}
          color="primary"
        />
        {confirmPasswordErrorMessages.length > 0 && (
          <div className="messages error-messages">
            <ul>
              {confirmPasswordErrorMessages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
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
        <hr />
        <Input
          type="text"
          name="lastname"
          placeholder="Nom de famille"
          onChange={changeField}
          value={lastname}
          color="primary"
        />
        <Input
          type="text"
          name="firstname"
          placeholder="Prénom"
          onChange={changeField}
          value={firstname}
          color="primary"
        />
        <Button type="submit" color="primary">
          S'inscrire
        </Button>
      </form>
      <p className="link">
        Déjà inscit ?{' '}
        <Button type="button" color="link-primary" onclick={() => toggleForm()}>
          Se connecter
        </Button>
      </p>
    </div>
  );
}

FormRegister.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};
