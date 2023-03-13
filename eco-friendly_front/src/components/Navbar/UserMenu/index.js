/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toggleBurger, toggleUserMenu } from '../../../actions/common';
import { userLogout } from '../../../actions/user';

import './styles.scss';

export default function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState('dropdown-menu');

  const avatar = useSelector((state) => state.user.avatar);
  const roles = useSelector((state) => state.user.roles);
  const nickname = useSelector((state) => state.user.nickname);

  const isAuthorized =
    roles.includes('ROLE_ADMIN') || roles.includes('ROLE_AUTHOR');

  /* user menu */
  const userMenuIsOpen = useSelector((state) => state.common.userMenuIsOpen);

  useEffect(() => {
    const className = userMenuIsOpen ? 'dropdown-menu show' : 'dropdown-menu';
    setIsOpen(className);
  }, [userMenuIsOpen]);

  const toggleMenus = () => {
    dispatch(toggleBurger());
    dispatch(toggleUserMenu());
  };
  /* end user menu */

  /* logout */
  const handleClickDelete = () => {
    dispatch(userLogout());
    toggleMenus();
    navigate('/', { replace: true });
  };
  /* end logout */

  return (
    <ul className={isOpen}>
      <img src={avatar} alt={`Avater de ${nickname}`} />
      <li className="menu-item account">
        <Link to={`/utilisateurs/${nickname}`} onClick={toggleMenus}>
          Gérer mon compte
        </Link>
      </li>
      <li className="menu-item account">
        <Link to="/conseils/ajouter" onClick={toggleMenus}>
          Ajouter un conseil
        </Link>
      </li>
      {isAuthorized && (
        <li className="menu-item">
          <a
            href="http://vps-79770841.vps.ovh.net/back_office/connexion"
            target="_blank"
            rel="noreferrer"
            onClick={toggleMenus}
          >
            Accès réservé
          </a>
        </li>
      )}
      <li className="menu-item text-secondary">
        <button type="button" onClick={handleClickDelete}>
          Déconnexion
        </button>
      </li>
    </ul>
  );
}
