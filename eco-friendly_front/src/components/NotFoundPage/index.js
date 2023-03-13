import './styles.scss';
import Page from '../Page';
import notFoundImage from './notFoundImage.png';

const NotFoundPage = () => (
  <Page>
    <div className="not-found">
      {/* <div className="wrapper"> */}
      <img src={notFoundImage} alt="Page 404" />
      <h1>Page non trouvée</h1>
      {/* </div> */}
    </div>
  </Page>
);

export default NotFoundPage;
