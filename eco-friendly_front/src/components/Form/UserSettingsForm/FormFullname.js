import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

export default function FormFullname() {
  const dispatch = useDispatch();

  /* Save firstname & lastname value with new key in sessionStorage */
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      sessionStorage.setItem('firstname', JSON.stringify(user.firstname));
      sessionStorage.setItem('lastname', JSON.stringify(user.lastname));
    }
  }, []);

  /* control input fields */
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);

  const changeField = (value, identifier) => {
    dispatch(userOnInputChange(value, identifier));
  };

  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRemoveErrorMessages());
    dispatch(userSettingsUpdate());
  };

  /* Save sessionStorage firstname & lastname values in state */
  const handleCancel = () => {
    if (sessionStorage.getItem('firstname')) {
      dispatch(
        userOnInputChange(
          JSON.parse(sessionStorage.getItem('firstname')),
          'firstname',
        ),
      );
    }
    if (sessionStorage.getItem('lastname')) {
      dispatch(
        userOnInputChange(
          JSON.parse(sessionStorage.getItem('lastname')),
          'lastname',
        ),
      );
    }
    dispatch(closeModal());
  };

  /* Error messages */
  const firstnameErrorMessages = useSelector(
    (state) => state.user.firstnameErrorMessages,
  );
  const lastnameErrorMessages = useSelector(
    (state) => state.user.lastnameErrorMessages,
  );

  /* Check if is updated */
  const isUpdated = useSelector((state) => state.user.isUpdated);

  useEffect(() => {
    if (isUpdated) {
      sessionStorage.removeItem('firstname');
      sessionStorage.removeItem('lastname');
      sessionStorage.removeItem('user');
      dispatch(userToggleIsUpdated());
      dispatch(closeModal());
    }
  }, [isUpdated]);

  return (
    <div className="modal-form fullname">
      <h5 className="title text-primary">Modifier mon Nom et Prénom</h5>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="lastname"
          placeholder="Nom de famille"
          onChange={changeField}
          value={lastname}
          color="primary"
        />
        {lastnameErrorMessages && lastnameErrorMessages.length > 0 && (
          <div className="messages error-messages">
            <ul>
              {lastnameErrorMessages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <Input
          type="text"
          name="firstname"
          placeholder="Prénom"
          onChange={changeField}
          value={firstname}
          color="primary"
        />
        {firstnameErrorMessages && firstnameErrorMessages.length > 0 && (
          <div className="messages error-messages">
            <ul>
              {firstnameErrorMessages.map((item) => (
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
