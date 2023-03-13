import './styles.scss';

function Hamburger() {
  return (
    <div className="hamburgerMenu">
      <div className="hamburger">
        <div className="burger burger1" />
        <div className="burger burger2" />
        <div className="burger burger3" />
      </div>

      <ul className="menuBurger">
        <li className="menuBurgerLi homepage">Accueil</li>
        <li className="menuBurgerLi mobility">Mobilité</li>
        <li className="menuBurgerLi home">Maison</li>
        <li className="menuBurgerLi health">Santé</li>
        <li className="menuBurgerLi energy">Energie</li>
      </ul>
    </div>

  );
}

export default Hamburger;
