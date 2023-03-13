import { useEffect, useState } from 'react';

import Button from '../../Button';
import avatar1 from '../../../assets/avatar/avatar-1.png';
import avatar2 from '../../../assets/avatar/avatar-2.png';
import avatar3 from '../../../assets/avatar/avatar-3.png';
import avatar4 from '../../../assets/avatar/avatar-4.png';
import avatar5 from '../../../assets/avatar/avatar-5.png';
import avatar6 from '../../../assets/avatar/avatar-6.png';
import avatar7 from '../../../assets/avatar/avatar-7.png';

export default function FormAvatar({ current }) {
  let handleSubmit; // Temporary variable while waiting for the implementation of Redux
  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
  ];

  return (
    <div className="modal-form">
      <h5 className="title text-secondary">Modifier mon avatar</h5>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="grid">
          {avatars.map((avatar, index) => (
            <Avatar key={index} avatar={avatar} id={index} />
          ))}
        </div>
        <Button type="submit" color="primary">
          C'est prêt !
        </Button>
        <Button type="reset">Annuler</Button>
      </form>
    </div>
  );
}

function Avatar({ avatar, id }) {
  /* The behavior of the component will be reviewed after installing Redux */

  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = (e) => {
    // save value in state
    setIsChecked(!isChecked);
    console.log(e.target.value);
  };

  return (
    <div className="grid-cell avatar" onChange={handleOnChange}>
      <input
        type="radio"
        id={`avatar${id}`}
        name={`avatar${id}`}
        value={`avatar${id}`}
        checked={isChecked}
        onChange={(e) => console.log(e)}
        onClick={() => setIsChecked(!isChecked)}
      />
      <label htmlFor={`avatar${id}`}>
        <img src={avatar} alt="avatar" />
      </label>
    </div>
  );
}
