import { useSelector } from 'react-redux';

import UserMenu from '../UserMenu';
import AppMenu from '../AppMenu';

import './styles.scss';

export default function Menu() {
  const userIsLogged = useSelector((state) => state.user.isLogged);

  return (
    <>
      <AppMenu />
      {userIsLogged && <UserMenu />}
    </>
  );
}
