import { useDispatch, useSelector } from 'react-redux';

import { toggleBurger } from '../../../actions/common';

import burger from './burger-icon.svg';
import './styles.scss';

export default function Burger() {
  const dispatch = useDispatch();

  const avatar = useSelector((state) => state.user.avatar);

  const icon = avatar || burger;
  const className = avatar ? 'navbar-burger-user-icon' : 'navbar-burger-icon';

  return (
    <button
      type="button"
      className="navbar-burger"
      onClick={() => dispatch(toggleBurger())}
    >
      <img src={icon} alt="toggle icon" className={className} />
    </button>
  );
}
