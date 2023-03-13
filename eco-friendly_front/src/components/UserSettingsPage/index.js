import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Page from '../Page';
import UserAccount from './UserAccount/index';
import UserAdvices from './UserAdvices/index';

import './styles.scss';

export default function UserSettingsPage() {
  const navigate = useNavigate();

  /* Check if user is logged */
  const userIslogged = useSelector((state) => state.user.isLogged);
  useEffect(() => {
    if (!userIslogged) {
      navigate('/', { replace: true });
    }
  }, [userIslogged]);

  return (
    <Page>
      <div className="settings">
        <UserAccount />
        <UserAdvices />
      </div>
    </Page>
  );
}
