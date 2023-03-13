/* eslint-disable brace-style */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  userLogout,
  userOnInputChange,
  userPasswordUpdate,
} from '../../actions/user';
import { removeErrorMessages } from '../../actions/common';

import Page from '../Page';
import Button from '../Button';

import image from './image.png';
import Input from '../Field/Input';

import './styles.scss';

function PasswordResetPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  /* Clear input fields and sessionStorage */
  const clearInformations = () => {
    dispatch(userOnInputChange('', 'password'));
    dispatch(userOnInputChange('', 'confirmPassword'));
    sessionStorage.removeItem('resetToken');
  };

  /* Clear user in sessionStorage & force logout */
  useEffect(() => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    dispatch(userLogout());
  }, []);

  /* Save token value with new key in sessionStorage */
  useEffect(() => {
    sessionStorage.setItem('resetToken', JSON.stringify(token));
  }, [token]);

  /* control input fields */
  const password = useSelector((state) => state.user.password);
  const confirmPassword = useSelector((state) => state.user.confirmPassword);

  const changeField = (value, identifier) => {
    dispatch(userOnInputChange(value, identifier));
  };

  /* control password confirmation */
  const [confirmPasswordError, setConfirmPasswordError] = useState([]);

  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removeErrorMessages());

    if (password !== confirmPassword) {
      setConfirmPasswordError(['Les mots de passe ne correspondent pas']);
    } else {
      setConfirmPasswordError([]);
      dispatch(userPasswordUpdate(sessionStorage.getItem('resetToken')));
    }
  };

  const handleCancel = () => {
    clearInformations();
    navigate('/', { replace: true });
  };

  /* Check if is updated */
  const isUpdated = useSelector((state) => state.user.isUpdated);

  useEffect(() => {
    if (isUpdated) {
      clearInformations();
      navigate('/', { replace: true });
    }
  }, [isUpdated]);

  /* Error messages */
  const passwordErrorMessages = useSelector(
    (state) => state.user.passwordErrorMessages,
  );

  return (
    <Page>
      <div className="password-reset">
        <h1 className="password-reset-title">
          Vous avez oublié ou souhaité réinitialiser votre mot de passe.
        </h1>
        <p className="password-reset-text">
          Veuillez saisir votre nouveau mot de passe. Il doit contenir au moins
          8 caractères, dont une majuscule, une minuscule, un chiffre et un
          caractère spécial.
        </p>
        {confirmPasswordError.length > 0 && (
          <div className="messages error-messages">
            <ul>
              {confirmPasswordError.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Input
            type="password"
            name="password"
            placeholder="Nouveau mot de passe"
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
          <div className="password-reset-buttons">
            <Button type="submit" color="primary">
              C'est parti !
            </Button>
            <Button type="reset" onclick={handleCancel}>
              Annuler
            </Button>
          </div>
        </form>
        <div className="password-reset-image">
          <img src={image} alt="enregistrement" />
        </div>
      </div>
    </Page>
  );
}

export default PasswordResetPage;
