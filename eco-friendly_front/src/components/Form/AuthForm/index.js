import { useState } from 'react';

import FormConnexion from './FormConnexion';
import FormRegister from './FormRegister';

export default function AuthForm() {
  const [showConnexion, setShowConnexion] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const togggleForm = () => {
    setShowConnexion(!showConnexion);
    setShowRegister(!showRegister);
  };

  return (
    <>
      {showConnexion && <FormConnexion toggleForm={togggleForm} />}
      {showRegister && <FormRegister toggleForm={togggleForm} />}
    </>
  );
}
