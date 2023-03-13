import { Link } from 'react-router-dom';

import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import twitter from './assets/twitter.png';

import './styles.scss';

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <div className="legals">
        <Link to="/mentions-legales">Mentions légales</Link>
      </div>
      <div className="copyright">
        {/* Dynamically added copyright year */}
        <p className="copyright-text">Eco-Friendly Copyrigth© {year}</p>
      </div>
      <div className="social">
        {/* Customize external links with to={{ pathname: "https://example.site.com" }} */}
        <Link to="/" target="_blank">
          <img src={twitter} alt="Logo de Twitter" />
        </Link>
        <Link to="/" target="_blank">
          <img src={instagram} alt="Logo d'Instagram" />
        </Link>
        <Link to="/" target="_blank">
          <img src={facebook} alt="Logo de Facebook" />
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
