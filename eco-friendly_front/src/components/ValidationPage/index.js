import Page from '../Page';

import image from './image.png';

import './styles.scss';

function ValidationPage() {
  return (
    <Page>
      <div className="validation">
        <h1 className="validation-title">
          Félicitation ! Votre email a bien été validée.
        </h1>
        <p className="validation-text">
          Vous pouvez dès à présent vous connecter à votre compte et partager
          vos premiers conseils !
        </p>
        <div className="validation-image">
          <img src={image} alt="enregistrement" />
        </div>
      </div>
    </Page>
  );
}

export default ValidationPage;
