/* eslint-disable object-curly-newline */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { openModal } from '../../../actions/common';

import { userOnInputChange } from '../../../actions/user';

import Button from '../../Button';
import FormNickname from '../../Form/UserSettingsForm/FormNickname';
import FormEmail from '../../Form/UserSettingsForm/FormEmail';
import FormFullname from '../../Form/UserSettingsForm/FormFullname';
import FormPassword from '../../Form/UserSettingsForm/FormPassword';
import FormDeleteAccount from '../../Form/UserSettingsForm/FormDeleteAccount';
import FormDeleteAdvice from '../../Form/UserSettingsForm/FormDeleteAdvice';
import FormAvatar from '../../Form/UserSettingsForm/FormAvatar';

export default function UserAccount() {
  const dispatch = useDispatch();

  /* control input fields */
  const nickname = useSelector((state) => state.user.nickname);
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);
  const avatar = useSelector((state) => state.user.avatar);
  const email = useSelector((state) => state.user.email);

  /* Watch close modal action */
  const modalIsOpen = useSelector((state) => state.common.modalIsOpen);

  /* Save sessionStorage nickname value in state nickname key if user closes modal */
  useEffect(() => {
    if (!modalIsOpen && sessionStorage.getItem('nickname')) {
      dispatch(
        userOnInputChange(
          JSON.parse(sessionStorage.getItem('nickname')),
          'nickname',
        ),
      );
      sessionStorage.removeItem('nickname');
    }
    if (!modalIsOpen && sessionStorage.getItem('firstname')) {
      dispatch(
        userOnInputChange(
          JSON.parse(sessionStorage.getItem('firstname')),
          'firstname',
        ),
      );
      sessionStorage.removeItem('firstname');
    }
    if (!modalIsOpen && sessionStorage.getItem('lastname')) {
      dispatch(
        userOnInputChange(
          JSON.parse(sessionStorage.getItem('lastname')),
          'lastname',
        ),
      );
      sessionStorage.removeItem('lastname');
    }
    if (!modalIsOpen && sessionStorage.getItem('email')) {
      dispatch(
        userOnInputChange(JSON.parse(sessionStorage.getItem('email')), 'email'),
      );
      sessionStorage.removeItem('email');
    }
  }, [modalIsOpen]);

  /**
   * Retunrs the content of the modal window
   * @param {String} contentName
   * @returns
   */
  const modalContent = (contentName) => {
    switch (contentName) {
      case 'nickname':
        return <FormNickname />;
      case 'email':
        return <FormEmail />;
      case 'fullname':
        return <FormFullname />;
      case 'password':
        return <FormPassword />;
      case 'delete-account':
        return <FormDeleteAccount />;
      case 'delete-advice':
        return <FormDeleteAdvice />;
      case 'avatar':
        return <FormAvatar />;
      default:
        return null;
    }
  };

  const toggleModal = (e) => {
    const { name } = e.target;
    dispatch(openModal(modalContent(name)));
  };

  return (
    <section className="account">
      <div className="account-inner">
        <div className="account-avatar">
          <img src={avatar} alt="Avatar par defaut" className="avatar" />
          <Button
            type="button"
            color="link-primary"
            name="avatar"
            onclick={toggleModal}
          >
            Modifier
          </Button>
        </div>
        <div className="account-user">
          <div className="account-row">
            <div className="account-body">
              <h5 className="account-title">Pseudo</h5>
              <p className="account-text nickname">{nickname}</p>
            </div>
            <Button
              type="button"
              color="primary"
              name="nickname"
              onclick={toggleModal}
            >
              Modifier
            </Button>
          </div>
          <div className="account-row">
            <div className="account-body">
              <h5 className="account-title">Email</h5>
              <p className="account-text email">{email}</p>
            </div>
            <Button
              type="button"
              color="primary"
              name="email"
              onclick={toggleModal}
            >
              Modifier
            </Button>
          </div>
          <div className="account-row">
            <div className="account-body">
              <h5 className="account-title">Nom et Prénom</h5>
              <p className="account-text fullname">{`${lastname} ${firstname}`}</p>
            </div>
            <Button
              type="button"
              color="primary"
              name="fullname"
              onclick={toggleModal}
            >
              Modifier
            </Button>
          </div>
        </div>
        <div className="account-controllers">
          <Button
            type="button"
            color="primary"
            name="password"
            onclick={toggleModal}
          >
            Changer de mot de passe
          </Button>
          <div className="account-warning-zone">
            <Button
              type="button"
              color="outline-secondary"
              name="delete-account"
              onclick={toggleModal}
            >
              Supprimer mon compte
            </Button>
            <p className="warning-text">
              Attention après confirmation cette action est irreverssible !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
