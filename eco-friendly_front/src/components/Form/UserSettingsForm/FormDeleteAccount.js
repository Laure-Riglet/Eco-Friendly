import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userDeleteAccount, userLogout } from '../../../actions/user';
import { closeModal } from '../../../actions/common';

import Button from '../../Button';

import './styles.scss';

export default function FormDeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(closeModal());
    dispatch(userDeleteAccount());
    dispatch(userLogout());
    navigate('/', { replace: true });
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-form delete-account">
      <h5 className="title text-secondary">
        Supprimer définitivement mon compte
      </h5>
      <p className="text-content  text-secondary">
        Attention si vous supprimez votre compte, cette action sera irreversible
        et vous perdrez les accès aux informations que vous avez partagées !
      </p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Button type="submit" color="secondary">
          Supprimer mon compte
        </Button>
        <Button type="reset" onclick={handleCancel}>
          Annuler
        </Button>
      </form>
    </div>
  );
}
