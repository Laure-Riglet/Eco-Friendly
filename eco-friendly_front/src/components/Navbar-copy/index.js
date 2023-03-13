/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */

import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { openModal } from '../../actions/common';
import AuthForm from '../Form/AuthForm';

import Hamburger from './Hamburger';
import Button from '../Button';

import navBarLogo from '../../assets/logos/logo-typo-l.png';

import './styles.scss';

function Navbar({ categories }) {
  const activeClassName = 'button active';

  const userIsLoaded = useSelector((state) => state.user.isLoaded);
  const userIsLogged = useSelector((state) => state.user.isLogged);
  const user = useSelector((state) => state.user.data);

  return (
    <div className="navbar">
      <div className="navbar-top">
        <Hamburger />
        <span className="empty"> empty </span>
        <img src={navBarLogo} alt="logo" className="navbar-logo" />
        {userIsLoaded && userIsLogged ? (
          <>
            <UserLogged nickname={user.nickname} avatar={user.avatar} />
            <NavLink to="/conseils/ajouter">Ajouter un conseil</NavLink>
          </>
        ) : (
          <UserNotLogged />
        )}
      </div>

      <nav className="navigation">
        <ul className="navigation-buttons">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClassName : 'button'
              }
              to="/"
            >
              Accueil
            </NavLink>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClassName : 'button'
                }
                to={`/categories/${category.slug}`}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

Navbar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

function UserNotLogged() {
  const dispatch = useDispatch();

  return (
    <div className="login">
      <Button
        link
        color="secondary"
        onclick={() => dispatch(openModal(<AuthForm />))}
      >
        Connexion/Inscription
      </Button>
    </div>
  );
}

function UserLogged({ nickname, avatar }) {
  return (
    <div className="login">
      <p className="login-message">{`Salut ${nickname} !`}</p>
      <Link to={`/utilisateurs/${nickname}`} className="login-avatar">
        <img src={avatar} alt={`avatar de ${nickname}`} />
      </Link>
    </div>
  );
}

UserLogged.propTypes = {
  nickname: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
