/* eslint-disable operator-linebreak */
/* eslint-disable brace-style */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { closeModal } from '../../../actions/common';
import { userOnInputChange, userLogin } from '../../../actions/user';

import Input from '../../Field/Input';
import Button from '../../Button';

import './styles.scss';

export default function FormConnexion({ toggleForm }) {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);

  const changeField = (value, identifier) => {
    dispatch(userOnInputChange(value, identifier));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin());
  };

  /* If the user is logged, close the modal */
  const isLogged = useSelector((state) => state.user.isLogged);

  useEffect(() => {
    if (isLogged) {
      dispatch(closeModal());
    }
  }, [isLogged]);

  /* Error message */
  const authErrorMessages = useSelector(
    (state) => state.user.authErrorMessages,
  );

  return (
    <div className="connexion">
      <h5 className="title text-primary">Se connecter</h5>
      {authErrorMessages && (
        <div className="messages error-messages">
          <ul>
            <li>{authErrorMessages}</li>
          </ul>
        </div>
      )}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeField}
          value={email}
          color="primary"
        />
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={changeField}
          value={password}
          color="primary"
        />
        <Button type="submit" color="primary">
          Se connecter
        </Button>
      </form>
      <p className="link">
        Première fois ?
        <Button type="button" color="link-primary" onclick={() => toggleForm()}>
          S'inscrire
        </Button>
      </p>
    </div>
  );
}

FormConnexion.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};
