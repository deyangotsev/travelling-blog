import React, { useContext } from "react";
import logo from '../images/logo.png'
import getNavigation from '../helper/nav'
import LinkComponent from '../Link/Link'
import { Link } from 'react-router-dom'
import UserContext from '../../Context'
import style from "./Header.module.css";

const Header = () => {
  const userData = useContext(UserContext);
  const { isLoggedIn, appUser } = userData;
  const links = getNavigation(isLoggedIn, appUser);

  return (

    <nav className={style.navigation}>
      <ul>
        <Link to="/">

          <img src={logo} className={style.logo} alt="travel logo" />

        </Link>
        <article className={style.listItems}>
          {
            links.map(nav => {
              return (
                <LinkComponent key={nav.title} to={nav.link} title={nav.title} />
              )
            })
          }
        </article>
      </ul>
    </nav>
  );
};

export default Header;
